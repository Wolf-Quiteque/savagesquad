import BackToTopButton from './components/BackToTopButton';
import ScriptLoader from './components/ScriptLoader';
import AnalyticsTracker from './components/AnalyticsTracker';
import RootLayoutClient from './components/RootLayoutClient';

export const metadata = {
  title: "Savage Squade | Surety Bond Certified Credit Services & Analysis",
  description: "Empower your credit journey with Savage Squade's professional, surety bond certified credit services. Get free consultation, expert analysis, and personalized solutions to improve your credit health.",
  keywords: "credit services, credit analysis, credit repair, credit consultation, surety bond certified, credit monitoring, financial goals, credit improvement",

  // Open Graph for Social Media
  openGraph: {
    title: "Savage Squade | Professional Credit Services",
    description: "Empower your credit journey with surety bond certified credit services. Schedule your free consultation today!",
    url: "https://www.savagecreditservices.com",
    siteName: "Savage Squade",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/open.png",
        width: 1200,
        height: 630,
        alt: "Savage Squade Credit Services",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Savage Squade | Professional Credit Services",
    description: "Expert credit analysis and personalized solutions. Surety bond certified. Free consultation available.",
    images: ["/assets/open-twitter.png"],
    creator: "@savagesquade",
  },

  // Additional SEO Meta Tags
  robots: "index, follow",
  author: "Savage Squade",

  // Alternate Links for Internationalization
  alternates: {
    canonical: "https://www.savagecreditservices.com/",
  },

  // Icons
  icons: {
    icon: "/assets/images/faviconnew.png",
  },

  // Additional Metadata
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#DBB46C",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Empower your credit journey with Savage Squade's professional, surety bond certified credit services. Get free consultation, expert analysis, and personalized solutions." />
        <meta name="keywords" content="credit services, credit analysis, credit repair, credit consultation, surety bond certified, credit monitoring, financial goals" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Savage Squade" />
        <meta name="theme-color" content="#DAA520" />

        {/* Favicon & Icons */}
        <link rel="shortcut icon" href="/assets/images/faviconnew.png" type="image/x-icon" />
        
        {/* Framework CSS */}
        <link rel="stylesheet" href="/assets/css/bootstrap-lib/bootstrap.min.css" />
        
        {/* Style Sheets */}
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        
        {/* Font Awesome Icons */}
        <link rel="stylesheet" href="/assets/font-awesome-lib/icon/font-awesome.min.css" />
        
        {/* Slick Slider */}
        <link rel="stylesheet" href="/assets/css/slick.min.css" />
        
        {/* Animation */}
        <link rel="stylesheet" href="/assets/css/aos.css" />

        {/* Preconnect to External Domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://portal.savagecreditservice.com" />

        {/* Preload critical images */}
        <link rel="preload" as="image" href="/assets/images/index/hero23.png" />
        <link rel="preload" as="image" href="/assets/images/index/hero_watch.png" />
        <link rel="preload" as="image" href="/assets/images/icon/hero_star.png" />
        <link rel="preload" as="image" href="/assets/images/logo2.png" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Savage Squade",
              description: "Professional surety bond certified credit services provider",
              url: "https://www.savagecreditservices.com/",
              logo: "https://www.savagecreditservices.com/assets/images/logo2.png",
              image: "https://www.savagecreditservices.com/assets/open.png",
              sameAs: [
                "https://www.facebook.com/people/Savage-Credit-Repair/61558166635772/",
                "https://www.instagram.com/savagecreditservices/?hl=en",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                telephone: "+1-866-753-4963",
                email: "Credit@savagesquad.com",
                hoursAvailable: "Mo,Tu,We,Th,Fr 08:00-23:00",
                areaServed: "US",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "1980 Post Oak Suite 100",
                addressLocality: "Houston",
                addressRegion: "TX",
                postalCode: "77056",
                addressCountry: "US",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "38",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Savage Squade",
              description: "Surety Bond Certified Credit Services",
              url: "https://www.savagecreditservices.com/",
              telephone: "+1-866-753-4963",
              email: "Credit@savagesquad.com",
              image: "https://www.savagecreditservices.com/assets/images/logo2.png",
              priceRange: "$",
              areaServed: {
                "@type": "Country",
                name: "US",
              },
              openingHourSpecification: {
                "@type": "OpeningHourSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "17:00",
              },
            }),
          }}
        />
      </head>
      <body>
        <RootLayoutClient>
          <AnalyticsTracker />
          {children}
          <BackToTopButton />
          <ScriptLoader />
        </RootLayoutClient>
      </body>
    </html>
  );
}
