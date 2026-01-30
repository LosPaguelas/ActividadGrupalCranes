
import { clearCache } from "./cachedFetch.js";

const MATCHES_URL = "http://localhost:3005/matches";

export async function reserveCandidate(companyId, candidateId) {
  await fetch(MATCHES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      companyId,
      candidateId,
      status: "reserved"
    })
  });

  clearCache(MATCHES_URL);
}

export async function updateMatchStatus(matchId, status) {
    await fetch(`${MATCHES_URL}/${matchId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  clearCache(MATCHES_URL);
}