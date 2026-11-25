/** Matches the mainshop's public read protocol; never attaches WaWi tokens. */
export async function publicTrpcQuery<T>(baseUrl: string, path: string, input?: Record<string, unknown>): Promise<T> {
  const url = new URL(`${baseUrl}/api/trpc/${path}`);
  if (input !== undefined) url.searchParams.set("input", JSON.stringify({ json: input }));
  const response = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Product service unavailable (${response.status})`);
  const payload = await response.json();
  if (!payload.result || payload.error) throw new Error("Invalid product service response");
  const data = payload.result.data;
  return (data && typeof data === "object" && "json" in data ? data.json : data) as T;
}
