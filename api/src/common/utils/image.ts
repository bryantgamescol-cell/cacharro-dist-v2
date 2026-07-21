export function imageUrl(image?: string) {

  if (!image) {

    return null;

  }

  const baseUrl =
    process.env.BASE_URL ||
    "http://localhost:3000";

  return `${baseUrl}/${image}`;

}