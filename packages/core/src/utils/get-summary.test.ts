import getSummary from "./get-summary";
describe("getSummary", () => {
  it("should return null if no summary is found", () => {
    const htmlString = "<p>Test</p>";
    expect(getSummary(htmlString)).toBe("");
  });
  it("should return the summary if found", () => {
    const paragraph: string = `
    This is a paragraph with some text. 
    <details>
        <summary>Click me</summary>
        <p>Details content goes here.</p>
    </details>
    More text after the details.
    `;

    expect(getSummary(paragraph)).toBe("Details content goes here.");
  });
});
