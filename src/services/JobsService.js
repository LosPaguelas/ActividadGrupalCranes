import { cachedFetch } from "./cachedFetch.js";

const USERS_URL = "http://localhost:3005/users";
const MATCHES_URL = "http://localhost:3005/matches";

export async function getCandidatesForCompany(companyId) {
  const candidates = await cachedFetch(`${USERS_URL}?role=candidate`);
  const matches = await cachedFetch(MATCHES_URL);

  return candidates
    .filter(candidate => {
      const blocked = matches.some(
        m =>
          m.candidateId === candidate.id &&
          m.companyId !== companyId &&
          m.status === "reserved"
      );
      return !blocked;
    })
    .map(candidate => {
      const { email, phone, ...publicData } = candidate;
      return publicData;
    });
}

export async function getCandidateWithContact(companyId, candidateId) {
  const matches = await cachedFetch(MATCHES_URL);

  const allowed = matches.some(
    m =>
      m.companyId === companyId &&
      m.candidateId === candidateId &&
      m.status === "contacted"
  );

  if (!allowed) return null;

  const [candidate] = await cachedFetch(`${USERS_URL}?id=${candidateId}`);
  return candidate;
}