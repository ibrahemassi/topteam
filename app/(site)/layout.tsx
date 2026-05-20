import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";

export default function SiteChromeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-black">{children}</main>
      <FooterSection />
    </>
  );
}
