import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "达的学习笔记", template: "%s · 达的学习笔记" },
  description: "把零散的思考，整理成可以回看的知识。记录 AI 工具、后端开发、工程实践与学习过程。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "达的学习笔记",
    description: "把零散的思考，整理成可以回看的知识。",
    type: "website",
    images: [{ url: "/og.jpg", width: 1536, height: 1024, alt: "达的学习笔记" }]
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN" suppressHydrationWarning><body>{children}</body></html>;
}
