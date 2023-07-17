import { bech32 } from "bech32";
import { Buffer } from "buffer";

/**
 * Method used to create a payment request invoice from a signed zap request.
 *
 * @Param String method
 * @param Object zap
 * @returns Promise
 */
/**
 * Method used to create a payment request invoice using a specific event signing method.
 *
 * @Param String method
 * @param Object zap
 * @returns Promise
 */
export async function createPaymentRequest(recipient, sats, zapreq) {
  const callback = await getLightningWalletCallback(recipient);
  if (!callback) {
    throw "Failed to fetch the note authors lightning wallet callback.";
  }

  // Will sort the hardcoded tag offsets later, i know what order they are in
  // but it could change in `zaps.js` and break this.
  const payrequrl = new URL(callback);
  payrequrl.searchParams.append("amount", (sats * 1000).toString());
  payrequrl.searchParams.append("nostr", JSON.stringify(zapreq));

  return fetch(payrequrl.href)
    .then((res) => res.json())
    .then((res) => res.pr);
}

/**
 * Looks up the recipients wallet callback url from their profile metadata.
 *
 * @param Object profile
 * @returns Promise
 */
function getLightningWalletCallback(profile) {
  return fetch(decodeLightningWalletEndpoint(profile))
    .then((res) => res.json())
    .then((res) => {
      return res.allowsNostr && res.callback;
    });
}

/**
 * Decodes a profiles lightning url from their profiles lud06 or lud16 field.
 *
 * @param Object The recipients profile metadata
 * @returns String
 */
function decodeLightningWalletEndpoint({ lud06, lud16 }) {
  if (lud16) {
    const [username, provider] = lud16.split("@");
    return `https://${provider}/.well-known/lnurlp/${username}`;
  }

  if (lud06) {
    const { words } = bech32.decode(lud06.toLowerCase(), { prefix: "lnurl" });
    return Buffer.from(bech32.fromWords(words)).toString("utf8");
  }
}
