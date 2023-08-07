import type { IRecentLink } from "../../types/RecentLink";

export default async function getRecentLinks(): Promise<IRecentLink[]> {
  // This is public, so no need for an API key
  const binId = "64d084818e4aa6225ecbea96";
  const apiUrl = `https://api.jsonbin.io/v3/b/${binId}/latest`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(apiUrl, options);
  const data = await response.json();

  if (response.ok) {
    return data?.record || [];
  }
  try {
    return [];
  } catch (error) {
    return [];
  }
}
