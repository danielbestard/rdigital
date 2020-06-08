
import { useState, Fragment } from "react";
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
import { PurchaseConsumer } from "../src/components/PurchaseProvider";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

function DialogToRemoveSide(props) {
    const [selectedSide, setSelectedSide] = useState("");

    return (
        <PurchaseConsumer>
            {
                ({items, setItems}) => (
                    <Dialog onClose={props.onClose} open={props.open} maxWidth="md" >
                        <DialogTitle style={{textAlign: "center"}}>Remove</DialogTitle>
                        <DialogContent>
                            <FormControl>
                                <RadioGroup
                                    
                                    value={selectedSide}
                                    onChange={event => setSelectedSide(event.target.value)}
                                >
                                    {
                                        Array.from(new Set(items[props.dish].sides)).map(side => (
                                            <FormControlLabel
                                                key={side}
                                                value={side}
                                                control={<Radio size="small" />}
                                                label={side}
                                                labelPlacement="start"
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={props.onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={() => {
                                props.onClose();
                                setItems(
                                    {
                                        ...items,
                                        [props.dish]: {
                                            ...items[props.dish],
                                            ["count"]: items[props.dish].count - 1,
                                            ["sides"]:
                                                items[props.dish].sides
                                                    .slice(0, items[props.dish].sides.indexOf(selectedSide))
                                                    .concat(items[props.dish].sides.slice(items[props.dish].sides.indexOf(selectedSide) + 1))
                                        }
                                    }
                                )
                            }}>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
        </PurchaseConsumer>
    )
}

function DialogToAddSide(props) {
    const [selectedSide, setSelectedSide] = useState("");

    return (
        <PurchaseConsumer>
            {
                ({items, setItems}) => (
                    <Dialog onClose={props.onClose} open={props.open} maxWidth="md" >
                        <DialogTitle style={{textAlign: "center"}}>Dish side</DialogTitle>
                        <DialogContent>
                            <FormControl>
                                <RadioGroup
                                    value={selectedSide}
                                    onChange={event => setSelectedSide(event.target.value)}
                                >
                                    {
                                        items[props.dish].availableSides.map(side => (
                                            <FormControlLabel
                                                key={side}
                                                value={side}
                                                control={<Radio size="small" />}
                                                label={side}
                                                labelPlacement="start"
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={props.onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={() => {
                                setItems(
                                    {
                                        ...items,
                                        [props.dish]: {
                                            ...items[props.dish],
                                            ["count"]: items[props.dish].count + 1,
                                            ["sides"]: items[props.dish].sides.concat([selectedSide])
                                        }
                                    }
                                );
                                props.onClose();
                            }}>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
        </PurchaseConsumer>
    )
}

export default function Order() {
    const [openDialogToAdd, setOpenDialogToAdd] = useState(false);
    const [openDialogToRemove, setOpenDialogToRemove] = useState(false);
    const [itemToModify, setItemToModify] = useState("");

    const classes = useStyles();

    return (
        <PurchaseConsumer>
            {
                ({items, setItems}) => (
                    <Fragment>
                        <Grid container direction="column">
                            <Grid item container>
                                <TableContainer>
                                    <Table size="small">
                                        <TableBody>
                                            {
                                                Object.keys(items).map(function(key) {
                                                    if (items[key].count > 0) {
                                                        return(
                                                            <TableRow>
                                                                <TableCell>
                                                                    {key}
                                                                </TableCell>
                                                                <TableCell padding="none" align="right" style={{minWidth: "9em"}}>
                                                                    <IconButton
                                                                        disabled={items[key].count <= 0 ? true : false}
                                                                        color="secondary"
                                                                        style={{padding: "0.2rem"}}
                                                                        onClick={function() {
                                                                            if (items[key].sides.every( (val, i, arr) => val === arr[0])) {
                                                                                setItems(
                                                                                    {
                                                                                        ...items,
                                                                                        [key]: {
                                                                                            ...items[key],
                                                                                            ["count"]: items[key].count - 1,
                                                                                            ["sides"]:
                                                                                                items[key].count === 1 ?
                                                                                                [items[key].availableSides[0]] :
                                                                                                items[key].sides.slice(0, -1)
                                                                                        }
                                                                                    }
                                                                                )
                                                                            } else {
                                                                                setItemToModify(key);
                                                                                setOpenDialogToRemove(true);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <RemoveCircleIcon />
                                                                    </IconButton>
                                                                    {items[key].count}
                                                                    <IconButton
                                                                        color="secondary"
                                                                        style={{padding: "0.2rem"}}
                                                                        onClick={() => {
                                                                            setItemToModify(key);
                                                                            setOpenDialogToAdd(true)
                                                                        }}
                                                                    >
                                                                        <AddCircleIcon />
                                                                    </IconButton>
                                                                    {" x " + items[key].price.toFixed(2) + "€"}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {(items[key].count * items[key].price).toFixed(2) + "€"}
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
                                                            .keys(items)
                                                            .map(key => items[key].count * items[key].price)
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
                        {
                            openDialogToAdd ?
                            <DialogToAddSide
                                open={openDialogToAdd}
                                onClose={() => setOpenDialogToAdd(false)}
                                dish={itemToModify}
                            /> : undefined
                        }
                        {
                            openDialogToRemove ?
                            <DialogToRemoveSide
                                open={openDialogToRemove}
                                onClose={() => setOpenDialogToRemove(false)}
                                dish={itemToModify}
                            /> : undefined
                        }
                    </Fragment>
                )
            }
        </PurchaseConsumer>
    )
}