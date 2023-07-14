import { bech32 } from "bech32";
import { Buffer } from "buffer";

export async function fetchPaymentRequest(zapreq, recipient) {
  const callback = await getWalletCallback(recipient.profile);
  if (!callback) {
    throw "Failed to fetch note authors lightning wallet callback.";
  }

  // Will sort the hardcoded tag offsets later, i know what order they are in
  // but it could change in `zaps.js` and break this.
  const payrequrl = new URL(callback);
  payrequrl.searchParams.append("amount", zapreq.tags[2][1]);
  payrequrl.searchParams.append("nostr", JSON.stringify(zapreq));

  return fetch(payrequrl.href).then((res) => res.json());
}

async function getWalletCallback(profile) {
  const url = decodeLightningURL(profile);
  const res = await fetch(url).then((res) => res.json());

  return res.allowsNostr && res.callback;
}

function decodeLightningURL({ lud06, lud16 }) {
  if (lud16) {
    const [username, provider] = lud16.split("@");
    return `https://${provider}/.well-known/lnurlp/${username}`;
  }

  if (lud06) {
    const { words } = bech32.decode(lud06.toLowerCase(), { prefix: "lnurl" });
    return Buffer.from(bech32.fromWords(words)).toString("utf8");
  }
}
