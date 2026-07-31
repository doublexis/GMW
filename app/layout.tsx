import "./globals.css";
import { CustomerProvider } from "../components/CustomerContext";

export const metadata = {
    title: "GiveMeWork",
    description: "Book verified artisans with protected payments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <CustomerProvider>{children}</CustomerProvider>
            </body>
        </html>
    );
}
