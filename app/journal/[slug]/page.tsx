import type { Metadata } from "next";
import { getEntry, journalEntries } from "@/content/journal";
import { JournalArticleClient } from "@/components/journal/JournalArticleClient";

export function generateStaticParams() {
  return journalEntries.map((e) => ({ slug: e.slug }));
}

// User-created entries live only in localStorage, so their slugs aren't in
// generateStaticParams — allow them to render on demand (the client wrapper
// resolves the content from localStorage).
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return { title: "ENTRY NOT FOUND // AK SPACE" };
  return {
    title: `${entry.title} // AK SPACE`,
    description: entry.excerpt,
  };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Default entries are known server-side; user-created ones resolve in the
  // client from localStorage (pass null and let the wrapper load it).
  const entry = getEntry(slug) ?? null;
  return <JournalArticleClient slug={slug} initialEntry={entry} />;
}
