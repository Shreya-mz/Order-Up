import "./globals.css";
import Navbar from "@/components/Navbar"; // Navbar ko import kiya

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        {/* max-w-md isliye rakha hai taki laptop pe bhi mobile jaisa dikhe, mast lagta hai */}
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
          
          <main className="pb-24"> 
            {/* pb-24 zaroori hai taki navbar content ko chhupaye na */}
            {children}
          </main>

          {/* Har page ke niche ye navbar dikhega */}
          <Navbar />
          
        </div>
      </body>
    </html>
  );
}