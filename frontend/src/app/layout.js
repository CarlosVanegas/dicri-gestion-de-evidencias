import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
    title: "DICRI - Gestión de Evidencias",
    description: "Sistema de gestión de evidencias para DICRI",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
        <body>
        <AuthProvider>{children}</AuthProvider>
        </body>
        </html>
    );
}
