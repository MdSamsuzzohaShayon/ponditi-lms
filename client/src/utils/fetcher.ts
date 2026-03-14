export async function fetchWithErrorHandling<T>(
    url: string,
    options?: RequestInit
): Promise<T> {

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(
            `Fetch failed: ${url} (${res.status} ${res.statusText})`
        );
    }

    try {
        return await res.json();
    } catch (err){
        console.log(err);
        
        throw new Error(`Invalid JSON from ${url}`);
    }
}