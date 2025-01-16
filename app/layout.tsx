import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/SidebarItems/Sidebar";
import { Providers } from "./Providers/Provider";
import AuthProvider from "./Providers/AuthProvider";
import Navbar from "./components/NavItems/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://monlamgranddictionaryeditor.onrender.com/"),
  title: "Monlam Grand Dictionary Editor",
  description: "Monlam Grand Dictionary Editor Website",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <div className="flex h-screen overflow-hidden">
              <div className="flex-shrink-0 max-sm:hidden">
                <Sidebar />
              </div>
              <div className="flex-grow overflow-auto">
                <Navbar />
                {children}
              </div>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
