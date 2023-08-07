import { token, owner, repo, apiUrl } from "../../config/constants";
import type { Post } from "../../types/posts";

export default async function getPost(issueId: number): Promise<Post | null> {
  const query = `
  query($issueId: Int!, $owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      issue(number: $issueId) {
        number
        title
        bodyHTML
      }
    }
  }
`;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { issueId, owner, repo },
    }),
  };

  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok) {
      const issue = data.data.repository.issue;
      const { number, title, bodyHTML } = issue;

      return {
        id: number,
        title,
        paragraph: bodyHTML,
        labels: [],
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}
