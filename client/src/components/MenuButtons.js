import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    buttonsContainer: {
        marginTop: "2em"
    },
    button: {
        textTransform: "capitalize",
        width: "5em",
        height: "5em",
        maxWidth: "5em",
        maxHeight: "5em",
        margin: "5px",
        backgroundColor: theme.palette.primary.light,
        color: "white"
    }
}));

export default function MenuButtons(props) {
    const classes = useStyles();

    return (
        <Grid container justify="center" alignItems="center" className={classes.buttonsContainer}>
            {props.subcategories.map(subcategory => (
                <Grid
                    item
                    key={subcategory}
                    component={Button}
                    variant="contained"
                    disableElevation
                    className={classes.button}
                    onClick={props.onClick}
                >
                    {subcategory}
                </Grid>
            ))}
        </Grid>
    )
}