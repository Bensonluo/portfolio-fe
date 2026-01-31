import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Peng Luo - ML Engineer & Software Developer',
  description: 'Portfolio of Peng Luo, specializing in LLM fine-tuning, RAG systems, and full-stack development.',
  keywords: ['Machine Learning', 'LLM', 'QLoRA', 'RAG', 'React', 'Python', 'FastAPI'],
  authors: [{ name: 'Peng Luo' }],
  openGraph: {
    title: 'Peng Luo - Portfolio',
    description: 'ML Engineer & Software Developer',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peng Luo - Portfolio',
    description: 'ML Engineer & Software Developer',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
