import { redirect } from "next/navigation";
import LinkNotFound from "@/app/components/LinkNotFound";

const url = `${process.env.NEXT_PUBLIC_API_URL}`;

interface PageProps {
  params: { user: string; shortenURL: string };
}

async function getOriginalUrl(shortUrl: string, user_id: string): Promise<string | null> {
  try {
    const res = await fetch(`${url}/link/urls/${user_id}/${shortUrl}`);

    if (!res.ok) return null;

    const data = await res.json();
    return data.original_url ?? null;
  } catch (error) {
    console.error("Error fetching original URL:", error);
    return null;
  }
}

export default async function ShortUrlPage({ params }: PageProps) {
  const originalUrl = await getOriginalUrl(params.shortenURL, params.user);

  if (!originalUrl) {
    return <LinkNotFound />;
  }

  redirect(originalUrl);
}
