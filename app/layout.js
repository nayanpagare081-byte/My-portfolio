import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], variable: "--font-poppins" });

export const metadata = {
  title: "Nayan Pagare — Portfolio",
  description: "Personal portfolio of Nayan Pagare",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className={`${inter.className} bg-[#0a0a0a] text-white overflow-x-hidden relative`}>
        {children}
      </body>
    </html>
  );
}
