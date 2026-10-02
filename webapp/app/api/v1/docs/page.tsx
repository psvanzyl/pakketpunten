import type { Metadata } from 'next';
import Script from 'next/script';
// Opt-in sub-path prefix (e.g. "/dashboards/pakketpunten"); empty at the root.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: 'API Documentation - Pakketpunten API',
  description: 'REST API documentation for retrieving parcel point data across Dutch municipalities',
};

export default function APIDocsPage() {
  const theme = JSON.stringify({
    colors: {
      primary: {
        main: '#2563eb',
      },
    },
    typography: {
      fontSize: '14px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
  });

  // Create the redoc element HTML string
  const redocHTML = `<redoc spec-url="${BASE_PATH}/openapi.yaml" theme='${theme}' expand-responses="200" required-props-first="true"></redoc>`;

  return (
    <div style={{ margin: 0, height: '100vh' }}>
      <Script
        src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"
        strategy="afterInteractive"
      />
      <div dangerouslySetInnerHTML={{ __html: redocHTML }} />
    </div>
  );
}
