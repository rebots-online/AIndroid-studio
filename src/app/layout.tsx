
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Droid Architect',
  description: 'Visually build and generate Android AI applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          geistSans.variable, 
          geistMono.variable, 
          "font-sans antialiased"
        )}
      >
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <div className="flex flex-col flex-1 min-h-screen">
            <AppHeader />
            <SidebarInset>
              <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
              </main>
            </SidebarInset>
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
