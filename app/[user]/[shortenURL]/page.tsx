import { redirect } from "next/navigation";
import LinkNotFound from "@/app/components/LinkNotFound";

// Simulate fetching original URL from a database
async function getOriginalUrl(shortUrl: string, user_id: string): Promise<string | null> {
    console.log(user_id, shortUrl ) ;
  const res = await fetch(`http://localhost:8000/link/urls/${user_id}/${shortUrl}`); // Replace with your actual API
  if (!res.ok) return null;
  const data = await res.json();
  return data.original_url; // Ensure your API returns { originalUrl: "https://example.com" }
}

export default async function ShortUrlPage({ params }: { params: { user: string; shortenURL: string  } }) {
    
  const originalUrl = await getOriginalUrl(params.shortenURL, params.user);

  if (!originalUrl) {
    return <LinkNotFound />;
  }

  redirect(originalUrl); // Redirects to the original URL
}
