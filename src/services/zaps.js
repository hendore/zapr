import { finishEvent } from "nostr-tools";
import { getPrivateKey } from "./userdata";

/**
 * Returns a signed zap request event ready to be sent to the recipients
 * wallet service provider.
 *
 * @
 */
export function createZapRequest({ recipient, note, sats, comment, relays }) {
  const paymentRequestEvent = {
    kind: 9734,
    content: comment,
    tags: [
      ["p", recipient],
      ["e", note],
      ["amount", (sats * 1000).toString()],
      ["relays", ...relays],
      ["client", "zapr.social"],
    ],
    created_at: Math.floor(new Date() / 1000),
  };

  return getPrivateKey().then((privatekey) => {
    return finishEvent(paymentRequestEvent, privatekey);
  });
}
