import { Fragment, useState } from "react";
import MenuTable from "../src/components/MenuTable";
import MenuButtons from "../src/components/MenuButtons";
import { PurchaseConsumer } from "../src/components/PurchaseProvider";

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState("");

    return (            
        <PurchaseConsumer>
            {
                ({items, _}) => (
                    <Fragment>
                        <MenuButtons
                            subcategories={Array.from(new Set(Object.values(items).map(item => item.subcategory)))}
                            onClick={event => {
                                setOpen(true);
                                setSelectedSubcategory(event.target.textContent)
                            }}
                        />
                        <MenuTable
                            selectedSubcategory={selectedSubcategory}
                            open={open}
                            onClose={() => setOpen(false)}
                        />
                    </Fragment>
                )
            }
        </PurchaseConsumer>
    )
}