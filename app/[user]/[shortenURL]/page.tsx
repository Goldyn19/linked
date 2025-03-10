import { redirect } from "next/navigation";
import LinkNotFound from "@/app/components/LinkNotFound";

interface PageProps {
  params: {
    user: string;
    shortenURL: string;
  };
}

const url = `${process.env.NEXT_PUBLIC_API_URL}`;

// Simulate fetching original URL from a database
async function getOriginalUrl(shortUrl: string, user_id: string): Promise<string | null> {
  console.log(user_id, shortUrl);
  const res = await fetch(`${url}/link/urls/${user_id}/${shortUrl}`); // Replace with your actual API
  if (!res.ok) return null;
  const data = await res.json();
  return data.original_url; // Ensure your API returns { original_url: "https://example.com" }
}

export default async function ShortUrlPage({ params }: PageProps) {
  const originalUrl = await getOriginalUrl(params.shortenURL, params.user);

  if (!originalUrl) {
    return <LinkNotFound />;
  }

  redirect(originalUrl); // Redirects to the original URL
}
