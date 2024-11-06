'use client'
import { HTMLProps } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { mainnet } from '@particle-network/authkit/chains';
import { AuthType } from '@particle-network/auth-core';
import dynamic from "next/dynamic";



export const Layout = ({ children }: Readonly<HTMLProps<HTMLDivElement>>) => {
    const AuthCoreContextProvider = dynamic(
        () => import('@particle-network/authkit').then(mod => mod.AuthCoreContextProvider),
        { ssr: false }
      );
    return (
        <AuthCoreContextProvider
            options={{
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
                appId: process.env.NEXT_PUBLIC_APP_ID!,
                chains: [mainnet],
                authTypes: [AuthType.email, AuthType.google, AuthType.twitter],
                themeType: "dark", // Login modal theme
                fiatCoin: "USD",
                language: "en",
                wallet: {
                    themeType: 'dark', // Wallet modal theme
                    visible: true,
                },
            }}
        >
            <Navbar />
            {children}
            <Footer />
        </AuthCoreContextProvider>
    )
}