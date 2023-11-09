import "../styles/globals.scss";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "One Day One Plant",
  description: "Grow your plant collection and learn about Earth flora",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
