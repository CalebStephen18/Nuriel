// handler.ts
export async function requestAPI<T>(
  endPoint: string, // Use the full endpoint URL here
  init: RequestInit
): Promise<T> {
  // Using Fetch API directly to make an external request
  const response = await fetch(endPoint, init);

  if (!response.ok) {
    // If the response is not OK, throw an error
    const errorBody = await response.text();
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText} - ${errorBody}`
    );
  }

  // Assuming the response is JSON
  const data: T = await response.json();
  return data;
}
