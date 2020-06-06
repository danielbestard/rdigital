import { Component, Fragment, useState, useEffect } from "react";
import api from "../src/api";
import MenuTable from "../src/components/MenuTable";
import MenuButtons from "../src/components/MenuButtons";

export default function Menu() {
    const [items, setItems] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState("");

    useEffect(() => {
        console.log("...........");
        api
            .getMenu()
            .then(res => {
                setItems(res.data.data);
                setSubcategories(Array.from(new Set(res.data.data.map(item => item.subcategory))))
            })
        }, []
    );

    return (            
        <Fragment>
            <MenuButtons
                subcategories={subcategories}
                onClick={event => {
                    setOpen(true);
                    setCurrent(event.target.textContent)
                }}
            />
            <MenuTable
                items={items.filter(item => item.subcategory === current)}
                current={current}
                open={open}
                onClose={() => setOpen(false)}
            />
        </Fragment>
    )
}

// export default class Menu extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             items: [],
//             subcategories: [],
//             open: false,
//             current: ""
//         }
//     }

//     componentDidMount() {
//         api
//             .getMenu()
//             .then(res => this.setState({
//                 items: res.data.data,
//                 subcategories: Array.from(new Set(res.data.data.map(item => item.subcategory)))
//             }))
//     }

//     render() {
//         return (            
//             <Fragment>
//                 <MenuButtons
//                     subcategories={this.state.subcategories}
//                     onClick={event => this.setState({open: true, current: event.target.textContent})}
//                 />
//                 <MenuTable
//                     items={this.state.items.filter(item => item.subcategory === this.state.current)}
//                     current={this.state.current}
//                     open={this.state.open}
//                     onClose={() => this.setState({open:false})}
//                 />
//             </Fragment>
//         )
//     }
// }