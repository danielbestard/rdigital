import { useState, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import CheckoutBadge from "../components/CheckoutBadge";

const useRowStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            borderBottom: 'unset'
        },
    },
    sideFoodButton: {
        textTransform: "none",
        backgroundColor: theme.palette.common.orange,
        color: "white"
    }
}));

function SideRow(props) {
    const [openSideOptions, setOpenSideOptions] = useState(false);
    const classes = useRowStyles();

    console.log(props.sideRow);
    console.log(props.items[props.itemName].sides);

    return (
        <TableRow className={classes.root}>
            <TableCell style={{fontWeight: 700, paddingLeft: "4.5em"}}>
                {
                    "Side " + (
                        props.items[props.itemName].count === 0 ||
                        props.items[props.itemName].count === 1
                        ? "" : props.sideRow + 1
                    )
                }
            </TableCell>
            <TableCell align="right">
                <Typography style={{color: "black", fontSize: "0.87rem"}}>
                    {props.items[props.itemName].sides[props.sideRow]}
                    <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => setOpenSideOptions(!openSideOptions)}
                    >
                        {openSideOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Typography>
                <Collapse in={openSideOptions} unmountOnExit>
                    <FormControl>
                        <RadioGroup
                            value={props.items[props.itemName].sides[props.sideRow]}
                            onChange={event => {
                                props.setItems(
                                    {
                                        ...props.items,
                                        [props.itemName]: {
                                            ...props.items[props.itemName],
                                            ["sides"]: {
                                                ...props.items[props.itemName].sides,
                                                [props.sideRow]: event.target.value
                                            }
                                        }
                                    }
                                )
                                setOpenSideOptions(false)}
                            }
                        >
                            {
                                props.items[props.itemName].availableSides.map(side => (
                                    <FormControlLabel
                                        key={side}
                                        value={side}
                                        control={<Radio size="small" />}
                                        label={side}
                                        labelPlacement="start"
                                        disabled={props.items[props.itemName].count === 0 ? true : false}
                                    />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

function Row(props) {
    const [openDetails, setOpenDetails] = useState(false);
    const classes = useRowStyles();

    return (
        <Fragment>
            <TableRow>
                <TableCell padding="none" align="right">
                    <IconButton size="small" color="secondary" onClick={() => setOpenDetails(!openDetails)}>
                        {openDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </TableCell>
                <TableCell style={{textTransform: "capitalize"}}>
                    {props.itemName}
                </TableCell>
                <TableCell padding="none" align="right">
                    {props.items[props.itemName].price.toFixed(2) + "€"}
                </TableCell>
                <TableCell padding="none" align="right" style={{minWidth: "8em"}} >
                    <IconButton
                        disabled={props.items[props.itemName].count <= 0 ? true : false}
                        color="secondary"
                        style={{paddingRight: "0.3rem"}}
                        onClick={() =>  props.setItems(
                            {
                                ...props.items,
                                [props.itemName]: {
                                    ...props.items[props.itemName],
                                    ["count"]: props.items[props.itemName].count - 1
                                }
                            }
                        )}
                    >
                        <RemoveCircleIcon />
                    </IconButton>
                    <TextField
                        id="standard-number"
                        type="number"
                        InputProps={{disableUnderline: true}}
                        inputProps={{style: {textAlign: "center", width: "1.3em"}}}
                        value={props.items[props.itemName].count}
                        onFocus={event => {event.target.select()}}
                        onChange={() => props.setItems(
                            {
                                ...props.items,
                                [props.itemName]: {
                                    ...props.items[props.itemName],
                                    ["count"]: parseInt(event.target.value),
                                    ["sides"]: Object.assign({...Array(parseInt(event.target.value)).fill(props.items[props.itemName].availableSides[0])}, props.items[props.itemName].sides)
                                }
                            }
                        )}
                    />
                    <IconButton
                        color="secondary"
                        style={{paddingLeft: "0.3rem"}}
                        onClick={() =>  props.setItems(
                            {
                                ...props.items,
                                [props.itemName]: {
                                    ...props.items[props.itemName],
                                    ["count"]: props.items[props.itemName].count + 1,
                                    ["sides"]: {
                                        ...props.items[props.itemName].sides,
                                        [parseInt(Object.keys(props.items[props.itemName].sides).slice(-1)[0]) + 1]: props.items[props.itemName].availableSides[0]
                                    }
                                }
                            }
                        )}
                    >
                        <AddCircleIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow className={classes.root}>
                <TableCell style={{paddingTop: 0 }} colSpan={4}>
                    <Collapse in={openDetails} unmountOnExit>
                        <Table size="small">
                            <TableBody>
                                <TableRow className={classes.root}>
                                    <TableCell style={{fontWeight: 700, paddingLeft: "4.5em"}}>
                                        Allergens
                                    </TableCell>
                                    <TableCell align="right">
                                        {props.items[props.itemName].allergens.join(" - ")}
                                    </TableCell>
                                </TableRow>
                                {
                                    Array
                                        .from(Array(props.items[props.itemName].count === 0 ? 1 : props.items[props.itemName].count).keys())
                                        .map(sideRow => (
                                            <SideRow key={sideRow} sideRow={sideRow} itemName={props.itemName} items={props.items} setItems={props.setItems} />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function MenuTable(props) {
    return (
        <Dialog fullScreen open={props.open} onClose={props.onClose} >
            <AppBar style={{position: "relative"}} elevation={0}>
                <Toolbar style={{marginRight: "1em"}}>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <IconButton style={{color: "white"}} onClick={props.onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography style={{textTransform: "capitalize", color: "white"}}>{props.current}</Typography>
                        </Grid>
                        <Grid item>
                            <CheckoutBadge />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <TableContainer>
                <Table size="small">
                    <TableBody>
                        {
                            Object
                                .keys(props.items)
                                .filter(key => (props.items[key].subcategory === props.current))
                                // .reduce((obj, key) => ({...obj, [key]: props.items[key]}), {})
                                .map(itemName => (
                                    <Row key={itemName} itemName={itemName} items={props.items} setItems={props.setItems} />
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>
    )
}