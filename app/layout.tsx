import './globals.css'
import type { Metadata } from 'next'

const siteUrl = 'https://www.mswebdesign.be'
const siteName = 'MS Webdesign'
const title = 'MS Webdesign — Professionele websites op maat in Vlaanderen & België'
const description =
  "MS Webdesign bouwt moderne, snelle websites die converteren voor zelfstandigen en KMO's in Vlaanderen. Van idee tot live website in 2 werkdagen, professioneel online vanaf €29,99/maand."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | MS Webdesign',
  },
  description,
  keywords: [
    'webdesign',
    'website laten maken',
    'websitebouwer',
    'webdesigner Vlaanderen',
    'webdesign België',
    'professionele website',
    'website op maat',
    'goedkope website laten maken',
    'website voor zelfstandigen',
    'website KMO',
  ],
  authors: [{ name: 'MS Webdesign' }],
  creator: 'MS Webdesign',
  publisher: 'MS Webdesign',
  applicationName: siteName,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'nl_BE',
    url: siteUrl,
    siteName,
    title,
    description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MS Webdesign — Websites die niet alleen mooi zijn, ze converteren.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'MS Webdesign',
  description,
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  priceRange: '€€',
  areaServed: {
    '@type': 'Country',
    name: 'België',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BE',
  },
  knowsLanguage: ['nl', 'fr', 'en'],
  sameAs: [],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Website op maat',
        description:
          "Professionele website op maat, van idee tot live website in 2 werkdagen, inclusief mobiele optimalisatie en SEO.",
      },
      price: '29.99',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '29.99',
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
