import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart/cart-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import CartSheet from '@/components/cart/cart-sheet';

export const metadata: Metadata = {
  title: 'aloe naturel',
  description: 'Des produits à base d\'aloe vera pour votre bien-être.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <CartSheet />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
