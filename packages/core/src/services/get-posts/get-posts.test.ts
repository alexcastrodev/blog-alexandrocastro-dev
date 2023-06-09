import getPosts from ".";
import mockResponse from "../../tests/mocks/get-posts-response.json";
describe("Get posts", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    (global as any).fetch = mockFetch;
  });

  afterEach(() => {
    delete (global as any).fetch;
  });

  it("Should get posts", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const posts = await getPosts();

    expect(posts).toEqual([
      {
        title: "Code Spliting com NextJS",
        paragraph:
          "Neste mock post, exploramos duas questões comuns de desempenho durante o desenvolvimento web: bundles grandes e carregamento redundante de componentes.",
        url: "code-spliting-com-nextjs-2",
      },
    ]);
  });
});
