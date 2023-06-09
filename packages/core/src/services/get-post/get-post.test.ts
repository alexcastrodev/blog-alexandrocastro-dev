import getPost from ".";
import mockResponse from "../../tests/mocks/get-post-response.json";
describe("Get post", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    (global as any).fetch = mockFetch;
  });

  afterEach(() => {
    delete (global as any).fetch;
  });

  it("Should get a post", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const posts = await getPost(2);

    expect(posts).toEqual({
      id: 2,
      title: "Code Spliting com NextJS",
      paragraph:
        '<h1 dir="auto">Code Spliting com NextJS</h1>\n<p dir="auto"><a target="_blank" rel="noopener noreferrer nofollow" href="https://raw.githubusercontent.com/AlexcastroDev/dynamic-import-poc/main/.github//intro.webp"><img src="https://raw.githubusercontent.com/AlexcastroDev/dynamic-import-poc/main/.github//intro.webp" width="800" style="max-width: 100%;"></a></p>\n<details>\n  <summary>TL;DR</summary>\n  <p dir="auto">Neste post, exploramos duas questões comuns de desempenho durante o desenvolvimento web: bundles grandes e carregamento redundante de componentes.</p>\n</details>',
    });
  });
});
