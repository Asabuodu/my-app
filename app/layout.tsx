// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Timer App",
//   description: "A simple timer app built with Next.js",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }



// import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
// import "./globals.css";

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"], // Include weights you want to use
//   variable: "--font-roboto",
// });

// export const metadata: Metadata = {
//   title: "Timer App",
//   description: "A simple timer app built with Next.js",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${roboto.variable} font-sans antialiased`}>
//         {children}
//       </body>
//     </html>
//   );
// }



// import "./globals.css";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { SessionProvider } from "next-auth/react";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Time Schedule App",
//   description: "Create and manage time schedules",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <SessionProvider
//           refetchInterval={5 * 60} // Refresh session every 5 minutes
//           refetchOnWindowFocus={true}
//         >
//           {children}
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// app/layout.tsx
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // Changed from /route
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time Schedule App",
  description: "Create and manage time schedules",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}