import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    footerContainer: {
        backgroundColor: theme.palette.common.blue,
        marginTop: 200
    }
}));

function Footer() {
    const classes = useStyles();

    return (
        <footer>
            <Grid container alignItems="center" className={classes.footerContainer}>
                <Grid item>
                    <Typography style={{color: "rgba(0, 0, 0, 0.54)", marginLeft: "1em"}}>
                        &copy; {"Copyright " + new Date().getFullYear()}
                    </Typography>
                </Grid>
                <Grid item style={{marginLeft: "auto"}}>
                    <IconButton
                        component={"a"}
                        href="https://www.facebook.com"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton
                        component={"a"}
                        href="https://www.instagram.com"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <InstagramIcon />
                    </IconButton>
                    <IconButton
                        component={"a"}
                        href="https://www.twitter.com"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <TwitterIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </footer>
    );
}

export default Footer;