import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DriveLux',
  description: 'Discover the best cars in the world',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative max-w-[1440px] mx-auto">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
