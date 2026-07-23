import { notFound } from "next/navigation";
import { BlogShell } from "../BlogShell";

const valid = ["archives", "categories", "tags", "about"] as const;
type Section = (typeof valid)[number];

export function generateStaticParams() {
  return valid.map((section) => ({ section }));
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!valid.includes(section as Section)) notFound();
  return <BlogShell view={section as Section} />;
}