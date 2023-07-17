import localforage from "localforage";
import CryptoJS from "crypto-js";

// Development hack - when I just want to restart from fresh
// localforage.dropInstance({ name: "zapper", storeName: "userdata" });

// The store used to persist user preferences and private key across
// multiple launches of the Zapper (IndexedDB)
localforage.config({ name: "zapper", storeName: "userdata" });

// Preferences that are saved when the zapper is ran for the first time
// or the user chooses to restore their modified preferences back to
// their original defaults.
const defaultPreferences = {
  amounts: [
    { emoji: "⚡️", sats: 1 },
    { emoji: "👅", sats: 69 },
    { emoji: "🎯", sats: 180 },
    { emoji: "🌿", sats: 420 },
    { emoji: "🍎", sats: 666 },
    { emoji: "🎰", sats: 777 },
    { emoji: "🚔", sats: 911 },
    { emoji: "🥉", sats: 1000 },
    { emoji: "🥈", sats: 2500 },
    { emoji: "🥇", sats: 5000 },
    { emoji: "💎", sats: 25000 },
    { emoji: "🫂", sats: 100000 },
  ],
  comment: "Pew Pew!",
  relays: [
    "wss://relay.damus.io",
    "wss://relay.snort.social",
    "wss://nostr.wine",
    "wss://relay.plebstr.com",
    "wss://eden.nostr.land",
    "wss://nos.lol",
  ],
};

/**
 * Returns the users stored prefereneces (hardcoded for now, will allow them to be edited later)
 *
 * @returns Promise
 */
export function getUserPreference() {
  return new Promise((resolve) => {
    return resolve(defaultPreferences);
  });
}

/**
 * Updates the users preferred signing method configuration.
 *
 * @param Object config
 * @returns Promise
 */
export function saveEventSigningConfig(config) {
  return localforage.setItem("signingconf", config);
}

/**
 * Returns the users stored public key.
 *
 * @returns Promise
 */
export function getUsersPublicKey() {
  return localforage.getItem("signingconf").then((config) => config.pubkey);
}

/**
 * Returns the users stored private key decrypted with the given passphrase.
 *
 * @param String passphrase
 * @returns Promise
 */
export function getUsersDecryptedPrivateKey(passphrase) {
  return localforage
    .getItem("signingconf")
    .then((config) => CryptoJS.AES.decrypt(config.privkey, passphrase))
    .then((decrypted) => decrypted.toString(CryptoJS.enc.Utf8));
}
