import { Fragment, useState } from "react";
import MenuTable from "../src/components/MenuTable";
import MenuButtons from "../src/components/MenuButtons";
import { PurchaseConsumer } from "../src/components/PurchaseProvider";

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState("");

    return (            
        <PurchaseConsumer>
            {
                ({items, setItems}) => (
                    <Fragment>
                        <MenuButtons
                            subcategories={Array.from(new Set(Object.values(items).map(item => item.subcategory)))}
                            onClick={event => {
                                setOpen(true);
                                setCurrent(event.target.textContent)
                            }}
                        />
                        <MenuTable
                            items={items}
                            setItems={setItems}
                            current={current}
                            open={open}
                            onClose={() => setOpen(false)}
                        />
                    </Fragment>
                )
            }
        </PurchaseConsumer>
    )
}