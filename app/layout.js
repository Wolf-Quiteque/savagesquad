import BackToTopButton from './components/BackToTopButton';
import ScriptLoader from './components/ScriptLoader';

export const metadata = {
  title: "Savage Squade | Surety Bond Certified Credit Services & Analysis",
  description: "Empower your credit journey with Savage Squade's professional, surety bond certified credit services. Get free consultation, expert analysis, and personalized solutions to improve your credit health.",
  keywords: "credit services, credit analysis, credit repair, credit consultation, surety bond certified, credit monitoring, financial goals, credit improvement",
  
  // Open Graph for Social Media
  openGraph: {
    title: "Savage Squade | Professional Credit Services",
    description: "Empower your credit journey with surety bond certified credit services. Schedule your free consultation today!",
    url: "https://savagecreditservice.com",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/images/og-image.jpg",
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
    image: "/assets/images/twitter-image.jpg",
    creator: "@savagesquade",
  },

  // Additional SEO Meta Tags
  robots: "index, follow",
  author: "Savage Squade",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",

  // Alternate Links for Internationalization
  alternates: {
    canonical: "https://savagecreditservice.com",
  },

  // Icons
  icons: {
    icon: "/assets/images/faviconnew.png",
  },

  // Additional Metadata
  manifest: "/manifest.json",
  themeColor: "#DAA520",
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Savage Squade",
    description: "Professional surety bond certified credit services provider",
    url: "https://savagecreditservice.com",
    logo: "https://savagecreditservice.com/assets/images/logo.png",
    image: "https://savagecreditservice.com/assets/images/og-image.jpg",
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
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Savage Squade",
    description: "Surety Bond Certified Credit Services",
    url: "https://savagecreditservice.com",
    telephone: "+1-866-753-4963",
    email: "Credit@savagesquad.com",
    image: "https://savagecreditservice.com/assets/images/logo.png",
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
  };

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
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Savage Squade | Professional Credit Services" />
        <meta property="og:description" content="Empower your credit journey with surety bond certified credit services. Schedule your free consultation today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://savagecreditservice.com" />
        <meta property="og:image" content="https://savagecreditservice.com/assets/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Savage Squade | Professional Credit Services" />
        <meta name="twitter:description" content="Expert credit analysis and personalized solutions. Surety bond certified. Free consultation available." />
        <meta name="twitter:image" content="https://savagecreditservice.com/assets/images/twitter-image.jpg" />
        <meta name="twitter:creator" content="@savagesquade" />
        <meta name="twitter:site" content="@savagesquade" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://savagecreditservice.com" />
        
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

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body>
        {children}

        {/* button back to top */}
        <BackToTopButton />

        {/* JavaScript files */}
        <ScriptLoader />
      </body>
    </html>
  );
}
