import { finishEvent } from "nostr-tools";
import * as Storage from "./storage";

/**
 * Method used to sign zap requests via the Zapr API instead of on the users device.
 *
 * @param Object event
 * @returns Promise
 */
export async function createZaprSignedZapRequest(zap) {
  const userPreferences = await Storage.getUserPreference();

  const payload = JSON.stringify({
    sender: zap.senderPubkey,
    recipient: zap.note.pubkey,
    note: zap.note.id,
    sats: zap.sats,
    relays: userPreferences.relays,
  });

  return fetch("https://api.zapr.social/zapreq/sign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  })
    .then((res) => res.json())
    .catch((err) => {
      throw "Failed to create a signed zap request";
    });
}

/**
 * Method used to sign zap requests on the users device instead of via the Zapr API.
 *
 * @param Object event
 * @returns Promise
 */
export async function createLocallySignedZapRequest(zap) {
  try {
    const userPreferences = await Storage.getUserPreference();
    const zapperPrivkey = await Storage.getUsersDecryptedPrivateKey(
      zap.passphrase
    );

    const unsignedZapRequest = {
      kind: 9734,
      content: userPreferences.comment,
      tags: [
        ["p", zap.note.pubkey],
        ["e", zap.note.id],
        ["amount", (zap.sats * 1000).toString()],
        ["relays", "wss://nostr.mutinywallet.com", ...userPreferences.relays],
        ["client", "zapr.social"],
      ],
      created_at: Math.floor(new Date() / 1000),
    };

    return finishEvent(unsignedZapRequest, zapperPrivkey);
  } catch (err) {
    alert(err.message);
  }
}
