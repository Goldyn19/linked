import { redirect } from "next/navigation";
import LinkNotFound from "@/app/components/LinkNotFound";

const url = process.env.NEXT_PUBLIC_API_URL;

// Fetch the original URL
async function getOriginalUrl(
  shortUrl: string,
  userId: string
): Promise<string | null> {
  try {
    const res = await fetch(`${url}/link/urls/${userId}/${shortUrl}`);
    if (!res.ok) return null;

    const data = await res.json();
    return data.original_url ?? null;
  } catch (error) {
    console.error("Error fetching original URL:", error);
    return null;
  }
}

// Define the `PageProps` type explicitly
interface PageProps {
  params: Promise<{
    user: string;
    shortenURL: string;
  }>;
}

// Ensure `Page` function properly matches expected types
export default async function Page({ params }: { params: PageProps['params'] }) {
  const resolvedParams = await params;
  return <RedirectHandler user={resolvedParams.user} shortenURL={resolvedParams.shortenURL} />;
}

// Redirect handler with resolved types
async function RedirectHandler({
  user,
  shortenURL,
}: {
  user: string;
  shortenURL: string;
}) {
  const originalUrl = await getOriginalUrl(shortenURL, user);

  if (!originalUrl) {
    return <LinkNotFound />;
  }

  redirect(originalUrl);
}
