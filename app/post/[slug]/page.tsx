import { BlogShell } from "../../BlogShell";
import { posts } from "../../content.generated";

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogShell view="post" slug={slug} />;
}