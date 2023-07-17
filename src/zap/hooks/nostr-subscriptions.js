import { useEffect, useState } from "react";
import { SimplePool, nip19 } from "nostr-tools";

const pool = new SimplePool();

/**
 * Creates a relay subscription for notes by the given id.
 *
 * @param String noteid
 * @returns Object|null
 */
export function useNoteSub(noteid, relays) {
  const [note, setNote] = useState();

  useEffect(() => {
    if (noteid && relays) {
      const { _type, data } = nip19.decode(noteid);
      const sub = pool.sub(relays, [{ ids: [data["id"] || data] }]);

      sub.on("event", setNote);

      return () => sub.unsub();
    }
  }, [noteid, relays]);

  return note;
}

/**
 * Creates a relay subscription for profile metadata events for the author of the given note.
 *
 * @param Object note
 * @returns Object|null
 */
export function useNoteAuthorSub(note, relays) {
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (note && note.pubkey && relays) {
      const sub = pool.sub(relays, [{ kinds: [0], authors: [note.pubkey] }]);
      sub.on("event", (e) => setProfile(JSON.parse(e.content)));

      return () => sub.unsub();
    }
  }, [note, relays]);

  return profile;
}
