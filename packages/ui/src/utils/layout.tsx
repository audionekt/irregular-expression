import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { lightTheme } from "../styles";
import "../styles/global.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });
  
  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });
  
  // Shared App Layout
  export interface AppLayoutProps {
    children: ReactNode;
  }
  
  export const Layout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
      <html lang="en">
        <body
          className={`${lightTheme} ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    );
  }
  