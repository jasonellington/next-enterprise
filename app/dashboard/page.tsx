import VirtualizedTable from "components/Table/VirtualizedTable"
import { ScrollProvider } from "hooks/useScrollContext"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Next.js Dashboard",
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

export default function Dashboard() {
  return (
    <ScrollProvider>
      <VirtualizedTable />
    </ScrollProvider>
  )
}
