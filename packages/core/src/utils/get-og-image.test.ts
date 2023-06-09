import getOGImage from "./get-og-image";

describe("get Open Graph Image", () => {
  it("should return the image if found", () => {
    const htmlString =
      '<html><body><img src="https://example.com/image.jpg"></body></html>';

    expect(getOGImage(htmlString)).toBe("https://example.com/image.jpg");
  });
});
