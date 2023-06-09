export default function getFirstImageSource(htmlString: string): string | null {
  const regex = /<img.*?src=["'](.*?)["']/;
  const match = htmlString.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return "";
}
