import type { Metadata } from 'next'

const title = 'Portfolio — Voorbeelden van onze websites'
const description =
  "Bekijk een selectie van websites die MS Webdesign heeft gebouwd voor kapsalons, restaurants, immokantoren, bouwbedrijven en meer. Inspiratie voor jouw nieuwe website."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title,
    description,
    url: 'https://www.mswebdesign.be/portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
