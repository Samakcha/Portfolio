import "./globals.css";

export const metadata = {
  title: "Samakcha Mishra — Developer",
  description: "Samakcha Mishra — developer exploring full-stack engineering, AI, and product building.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,600;1,600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
