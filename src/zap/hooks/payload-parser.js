import { useSearchParams } from "react-router-dom";

export default function usePayloadParser() {
  const [params] = useSearchParams();
  const payload = decodeURI(params.get("payload"));

  // Handle website urls passed in as the payload
  if (payload.startsWith("http://") || payload.startsWith("https://")) {
    const supportedSitePrefixes = [
      "https://damus.io/",
      "https://snort.social/e/",
    ];

    for (const idx in supportedSitePrefixes) {
      if (payload.startsWith(supportedSitePrefixes[idx])) {
        return payload.substring(supportedSitePrefixes[idx].length);
      }
    }

    // Failed to parse an event from the given url (unsupported)
    return null;
  }

  // Not a url, we have to assume its an event we can decode and make sense of 🤞
  return payload;
}
