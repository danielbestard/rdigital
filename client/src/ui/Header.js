import { useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from "../components/Link";
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckoutBadge from "../components/CheckoutBadge";

function Header(props) {
    const routes = [
        {name: "Home", link: "/", activeIndex: 0},
        {name: "Menu", link: "/menu", activeIndex: 1},
        {name: "Today", link: "/today", activeIndex: 2},
        {name: "Children", link: "/children", activeIndex: 3}
    ];

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);

    React.useEffect(() => {
        routes.forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (selectedIndex !== route.activeIndex) {
                        setSelectedIndex(route.activeIndex);
                    }
                    break;
                default:
                    break;
            }
        });
    });

    return (
        <AppBar position="sticky" elevation={0}>
            <Toolbar>
                <IconButton component={Link} href="/" style={{paddingLeft: 0}} >
                    <img src="assets/logo.svg" alt="logo" style={{width: "8em", height: "3em"}} />
                </IconButton>
                <ButtonGroup style={{marginLeft: "auto"}}>
                    <CheckoutBadge />
                    <IconButton onClick={() => setOpenDrawer(true)} style={{color: "white"}} >
                        <MenuIcon />
                    </IconButton>
                </ButtonGroup>

                <SwipeableDrawer
                    anchor="left"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    onOpen={() => setOpenDrawer(true)}
                >
                    {
                        <List>
                            {routes.map(route => (
                                <ListItem
                                    key={route.name}
                                    component={Link}
                                    href={route.link}
                                    selected={selectedIndex === route.activeIndex}
                                    onClick={(_, index) => {setOpenDrawer(false); setSelectedIndex(index)}}
                                    style={{textTransform: "none"}}
                                >
                                    <ListItemText primary={route.name} />
                                </ListItem>
                            ))}
                        </List>
                    }
                </SwipeableDrawer>
            </Toolbar>
        </AppBar>
    );
}

export default Header;