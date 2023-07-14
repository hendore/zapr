import { useEffect, useState } from "react";
import { loadPreferences } from "./services/userdata";

/**
 * Exposes the users preferences to any component using the hook.
 *
 * @returns Object|undefined
 */
export function usePreferences() {
  const [preferences, setPreferences] = useState();

  useEffect(() => {
    loadPreferences().then((preferences) => {
      setPreferences(preferences);
    });
  }, []);

  return preferences;
}
