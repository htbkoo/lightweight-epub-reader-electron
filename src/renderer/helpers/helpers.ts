import {Dialog} from "electron";
import {createMuiTheme} from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const GREY_900 = '#212121';

export function getElectronDialog(): Dialog {
    return (window as any).electron.dialog;
}

export function createEpubReaderTheme() {
    return createMuiTheme({
        palette: {
            primary: {
                main: GREY_900,
            },
            secondary: blueGrey,
        },
    });
}