import {Dialog} from "electron";
import {createMuiTheme} from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
// import { DIALOG_API_KEY } from "../../dialog";

const GREY_900 = '#212121';

export function getElectronDialog(): Dialog {
    console.log(`DEBUGDEBUG -- ${(window as any)["IpcDialog"]} `)
    return (window as any)["IpcDialog"];
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
