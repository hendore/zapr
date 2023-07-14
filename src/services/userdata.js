import localforage from "localforage";

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
 *
 *
 * @param String pk
 * @returns Promise
 */
export function loadPreferences() {
  return localforage.getItem("preferences").then((preferences) => {
    return defaultPreferences;

    // Uncomment below later when we can modify preferences
    // return preferences || restoreDefaultPreferences();
  });
}

/**
 *
 *
 * @param String pk
 * @returns Promise
 */
export function restoreDefaultPreferences() {
  return savePreferences(defaultPreferences).then(() => {
    return defaultPreferences;
  });
}

/**
 *
 *
 * @param String pk
 * @returns Promise
 */
export function savePreferences({ amounts, comment, relays, wallet }) {
  return localforage.setItem("preferences", {
    amounts,
    comment,
    relays,
    wallet,
  });
}

/**
 * Stores the users private key for use later.
 *
 * @param String pk
 * @returns Promise
 */
export function savePrivateKey(pk) {
  return localforage.setItem("privatekey", pk);
}

/**
 * Returns the users stored private key.
 *
 * @param String pk
 * @returns Promise
 */
export function getPrivateKey() {
  return localforage.getItem("privatekey");
}

/**
 * Removes any previously stored private key.
 *
 * @returns Promise
 */
export function clearPrivateKey() {
  return localforage.removeItem("privatekey");
}
