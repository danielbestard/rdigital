import { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Header from "../src/ui/Header";
import Footer from "../src/ui/Footer";
import Theme from "../src/ui/Theme";
import PurchaseContext from "../src/components/PurchaseContext";
import SideOptionsContext from "../src/components/SideOptionsContext";

export default function MyApp({ Component, pageProps }) {
    const [checkoutItemsCount, setCheckoutItemsCount] = useState({});
    const [sideOptions, setSideOptions] = useState({});
    const checkoutItems = {checkoutItemsCount, setCheckoutItemsCount};
    const side = {sideOptions, setSideOptions};

    return (
        <PurchaseContext.Provider value={checkoutItems}>
            <SideOptionsContext.Provider value={side}>
                <ThemeProvider theme={Theme}>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </ThemeProvider>
            </SideOptionsContext.Provider>
        </PurchaseContext.Provider>

    )
}