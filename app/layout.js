import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Kanopy | Luxury Eco-Hut Sanctuaries",
  description: "Immerse yourself in a luxurious glass-wooden retreat suspended in deep forest mist. Architectural design meets raw wilderness.",
  keywords: "luxury eco-hut, forest resort, cabin retreat, modern design, sustainable architecture",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05100d] text-[#efeae2]">
        {/* Custom cursor overlay */}
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
