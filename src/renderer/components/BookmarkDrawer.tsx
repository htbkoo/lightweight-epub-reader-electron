import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';

import LoadBookPanelContainer from "../containers/LoadBookPanelContainer";
import BookTextAreaContainer from "../containers/BookTextAreaContainer";
import BookmarkBarContainer from "../containers/BookmarkBarContainer";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fullList: {
            width: 'auto',
        },
    }),
);

function BookmarkDrawer() {
    const anchor = 'top';

    const classes = useStyles();
    const [isDrawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open);
    };

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>{anchor}</Button>
            <Drawer anchor={anchor} open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <DrawerContent/>
            </Drawer>
        </div>
    );

    function DrawerContent() {
        return (
            <div
                className={classes.fullList}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <BookmarkBarContainer/>
                <Divider/>
            </div>
        );
    }
}


export default BookmarkDrawer;
