import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL || "";

export const metadata = {
  title: "DriveFleet | Car Rental Platform",
  description: "DriveFleet full stack car rental platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {API_ORIGIN ? <link rel="preconnect" href={API_ORIGIN} crossOrigin="anonymous" /> : null}
      </head>
      <body>
        <Toaster position="top-right" />
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
