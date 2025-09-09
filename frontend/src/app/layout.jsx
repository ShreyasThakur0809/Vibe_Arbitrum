import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Web3Provider } from "./providers/Web3Provider";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./providers/ThemeProvider"; // Import ThemeProvider
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { title: "Vibe", description: "Connect with purpose" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider>
          <Web3Provider>
            <AuthProvider>
              <Navbar />
              <main className="container mx-auto p-4 sm:p-8">
                {children}
              </main>
            </AuthProvider>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}