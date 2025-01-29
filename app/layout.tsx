import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Turfbuddie - Your Ultimate Turf Booking Platform",
  description: "Book turfs, organize matches, and enjoy the game with Turfbuddie!",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={geistSans.className}
      suppressHydrationWarning
    >
      <body className="bg-gray-50 text-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Fixed Navigation Bar */}
          <nav className="w-11/12 bg-gradient-to-r from-yellow-300 to-green-500 shadow-md fixed left-1/2 top-6 -translate-x-1/2 z-50 rounded-2xl">
  <div className="w-full max-w-5xl mx-auto flex justify-between items-center p-4">
    <div className="flex gap-5 items-center font-semibold">
      <Link href={"/"} className="text-xl md:text-2xl font-bold text-gray-800 hover:text-teal-600 transition duration-300">
        Turfbuddie
      </Link>
    </div>
    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
  </div>
</nav>
        <div className="w-full bg-cover">{children}</div>
                
              
        </ThemeProvider>
      </body>
    </html>
  );
}


// import { EnvVarWarning } from "@/components/env-var-warning";
// import HeaderAuth from "@/components/header-auth";
// import { ThemeSwitcher } from "@/components/theme-switcher";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";
// import { Geist } from "next/font/google";
// import { ThemeProvider } from "next-themes";
// import Link from "next/link";
// import "./globals.css";

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Next.js and Supabase Starter Kit",
//   description: "The fastest way to build apps with Next.js and Supabase",
// };

// const geistSans = Geist({
//   display: "swap",
//   subsets: ["latin"],
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={geistSans.className}
//       suppressHydrationWarning
//     >
//       <body className="bg-background text-foreground">
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="light"
//           enableSystem
//           disableTransitionOnChange
//         >
          
//           <main className="min-h-screen flex flex-col items-center">
//             <div  className="flex-1 w-full flex flex-col gap-20 items-center">
//               <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
//                 <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
//                   <div className="flex gap-5 items-center font-semibold">
//                     {/* LOGO WILL BE PLACED HERE */}
//                     <Link href={"/"}>Turfbuddie</Link>
//                     <div className="flex items-center gap-2"></div>
//                   </div>
//                   {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
//                 </div>
//               </nav>
//               <div className="flex flex-col gap-20 max-w-5xl p-5">
//                 {children}
//               </div>
//               {/* NEEDED  TO BE CHANGED LATER */}
//               {/* <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
//                 <p>
//                   Powered by{" "}
//                   <a
//                     href="https://turfbuidde.com"
//                     target="_blank"
//                     className="font-bold hover:underline"
//                     rel="noreferrer"
//                   >
//                     Turfbuddie
//                   </a>
//                 </p>
//               </footer> */}
//             </div>
//           </main>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
