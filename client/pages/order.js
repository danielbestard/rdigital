import { useContext } from "react";
import PurchaseContext from "../src/components/PurchaseContext";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles(theme => ({
    orderButton: {
        textTransform: "none",
        backgroundColor: theme.palette.common.orange,
        borderRadius: 50,
        color: "white",
        fontFamily: "Roboto",
        fontWeight: 700,
        fontSize: 20,
        width: "13em",
        height: "2.5em",
        textAlign: "center"
    }
}));

export default function Order() {
    const classes = useStyles();
    const { checkoutItemsCount, setCheckoutItemsCount } = useContext(PurchaseContext);

    return (
        <Grid container direction="column">
            <Grid item container>
                <TableContainer>
                    <Table size="small">
                        <TableBody>                    
                            {
                                Object.keys(checkoutItemsCount).map(function(key) {
                                    if (checkoutItemsCount[key].count > 0) {
                                        return(
                                            <TableRow>
                                                <TableCell>
                                                    {key}
                                                </TableCell>
                                                <TableCell padding="none" align="right">
                                                    <IconButton
                                                        disabled={(checkoutItemsCount[key] === undefined ? 0 : checkoutItemsCount[key].count) <= 0 ? true : false}
                                                        color="secondary"
                                                        style={{padding: "0.2rem"}}
                                                        onClick={() => setCheckoutItemsCount(
                                                            items => ({...items, [key]: {count: (items[key] === undefined ? 0 : items[key].count) - 1, price: items[key].price}})
                                                        )}
                                                    >
                                                        <RemoveCircleIcon />
                                                    </IconButton>
                                                    {checkoutItemsCount[key].count}
                                                    <IconButton
                                                        color="secondary"
                                                        style={{padding: "0.2rem"}}
                                                        onClick={() => setCheckoutItemsCount(
                                                            items => ({...items, [key]: {count: (items[key] === undefined ? 0 : items[key].count) + 1, price: items[key].price}})
                                                        )}
                                                    >
                                                        <AddCircleIcon />
                                                    </IconButton>
                                                    {" x " + checkoutItemsCount[key].price.toFixed(2) + "€"}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {(checkoutItemsCount[key].count * checkoutItemsCount[key].price).toFixed(2) + "€"}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                })
                            }
                            <TableRow>
                                <TableCell style={{fontWeight: 700}}>TOTAL</TableCell>
                                <TableCell style={{fontWeight: 700}} colSpan={2} align="right">
                                    {
                                        Object
                                            .keys(checkoutItemsCount)
                                            .map(key => checkoutItemsCount[key].count * checkoutItemsCount[key].price)
                                            .reduce((a, b) => a + b, 0)
                                            .toFixed(2) + "€"
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item container justify="center" style={{marginTop: "5em"}}>
                <Grid item component={Button} className={classes.orderButton}>
                    Order Now
                </Grid>
            </Grid>
        </Grid>

    )
}