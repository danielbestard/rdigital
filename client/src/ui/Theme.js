import { createMuiTheme } from "@material-ui/core/styles";

const lightBlue = "#2fc4b2";
const darkBlue = "#12947f";
const orange = "#f17808";
const red = "#e71414";

export default createMuiTheme({
    palette: {
        common: {
            blue: lightBlue,
            orange: orange
        },
        primary: {
            main: lightBlue
        },
        secondary: {
            main: orange
        }
    },
    overrides: {
        MuiFormControlLabel: {
            label: {
                fontSize: '0.87rem',
            }
        },
        MuiFormControl: {
            root: {
                verticalAlign: "center"
            }
        }
    }
});