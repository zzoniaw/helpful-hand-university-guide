import { useCallback, useEffect, useState } from "react";
import { EMPTY_PROFILE, type CandidateProfile } from "./matching";

const KEY = "helpful-hand-profile";

export function useCandidateProfile() {
  const [profile, setProfile] = useState<CandidateProfile>(EMPTY_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setProfile({ ...EMPTY_PROFILE, ...(JSON.parse(raw) as CandidateProfile) });
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const update = useCallback((next: CandidateProfile) => {
    setProfile(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  return { profile, update, loaded };
}