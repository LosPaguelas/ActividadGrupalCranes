export async function cachedFetch(url, ttl = 5 * 60 * 1000) {
    const key = `cachedFetch:${url}`;
    const cached = localStorage.getItem(key);

    if (cached) {
        const {data, timestamp} = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
            return data;
        }
    }
    const res = await fetch(url);
    const data = await res.json();

    localStorage.setItem(
        key,
        JSON.stringify({data,timestamp:Date.now()})
          
    );
    return data;


    }

    export function clearCache(url) {
        localStorage.removeItem(`cachedFetch:${url}`);}