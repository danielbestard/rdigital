import { createContext, useState, useEffect } from 'react';
import api from "../api";

const PurchaseContext = createContext();

function PurchaseProvider(props) {
    const [items, setItems] = useState({});

    useEffect(() => {
        api
            .getMenu()
            .then(res => setItems(
                res.data.data.reduce((o, key) => ({ ...o, [key.name]: {
                    count: 0,
                    sides: [key.side[0]],
                    availableSides: key.side,
                    price: key.price,
                    allergens: key.allergens,
                    category: key.category,
                    subcategory: key.subcategory
                }}), {})                
            ))
        }, []
    );

    return(
        <PurchaseContext.Provider value={{items, setItems}}>
            {props.children}
        </PurchaseContext.Provider>
    )
}

const PurchaseConsumer = PurchaseContext.Consumer;

export default PurchaseProvider;
export { PurchaseConsumer };