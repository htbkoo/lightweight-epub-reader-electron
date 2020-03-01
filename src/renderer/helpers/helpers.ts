import {Dialog} from "electron";

export function getElectronDialog(): Dialog {
    return (window as any).electron.dialog;
}