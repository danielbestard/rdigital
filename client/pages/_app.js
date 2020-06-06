import { ThemeProvider } from "@material-ui/core/styles";
import Header from "../src/ui/Header";
import Footer from "../src/ui/Footer";
import Theme from "../src/ui/Theme";
import PurchaseProvider from "../src/components/PurchaseProvider";

export default function MyApp({ Component, pageProps }) {
    return (
        <PurchaseProvider>
            <ThemeProvider theme={Theme}>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </ThemeProvider>
        </PurchaseProvider>
    )
}