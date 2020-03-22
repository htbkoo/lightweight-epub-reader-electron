import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Box from "@material-ui/core/Box";

import BookmarkBarContainer from "../containers/BookmarkBarContainer";
import {AppState} from "../reducers/appReducer";

interface Props {
    app: AppState;
    setDrawerOpen: (open: boolean) => any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fullList: {
            width: 'auto',
            // backgroundColor: "#000",
            backgroundColor: theme.palette.primary.dark,
            padding: theme.spacing(1),
        },
    }),
);

function BookmarkDrawer({app, setDrawerOpen}: Props) {
    const anchor = 'top';

    const classes = useStyles();

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
        <Box m={1}>
            <Drawer anchor={anchor} open={app.isBookmarkDrawerOpen} onClose={toggleDrawer(false)}>
                <DrawerContent/>
            </Drawer>
        </Box>
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
