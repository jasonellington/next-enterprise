import { VirtualGrid } from "components/Grid"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Next.js Grid",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}

export default function Grid() {
  return <VirtualGrid />
}
