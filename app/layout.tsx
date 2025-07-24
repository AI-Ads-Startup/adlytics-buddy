import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import ClientLayout from './client-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'AdsCampaign - Professional Google Ads Without the Complexity',
    description: 'Create and manage high-converting Google Ads campaigns in just 15 minutes. Start with our $150/month platform fee.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </Providers>
            </body>
        </html>
    )
}
