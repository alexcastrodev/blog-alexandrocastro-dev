export default function getSummary(paragraph: string) {
  const pattern =
    /<details\b[^>]*>[\s\S]*?<p\b[^>]*>([\s\S]*?)<\/p>[\s\S]*?<\/details>/i;
  const match = paragraph.match(pattern);

  if (match) {
    return match[1].trim();
  } else {
    return "";
  }
}
