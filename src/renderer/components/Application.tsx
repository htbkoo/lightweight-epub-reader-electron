import * as React from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';

import LoadBookPanelContainer from "../containers/LoadBookPanelContainer";
import BookTextAreaContainer from "../containers/BookTextAreaContainer";
import BookmarkDrawerContainer from "../containers/BookmarkDrawerContainer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        "body": {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            minHeight: "100%",
        },
        "padding": {"padding": "1%", height: "100%", boxSizing: "border-box"}, // reference: https://stackoverflow.com/a/41663710
    }),
);

function HideOnScroll({children}: { children: React.ReactElement; }) {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function Application() {
    const classes = useStyles();

    return (
        <div className={clsx(classes.body)}>
            <CssBaseline/>
            <BookmarkDrawerContainer/>

            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <LoadBookPanelContainer/>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <Toolbar/>

            <Container>
                <Box py={2}>
                    <BookTextAreaContainer/>
                </Box>
            </Container>
        </div>
    );
}

export default Application;
