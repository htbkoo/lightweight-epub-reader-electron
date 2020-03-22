import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import LoadBookPanelContainer from "../containers/LoadBookPanelContainer";
import BookTextAreaContainer from "../containers/BookTextAreaContainer";
import BookmarkBarContainer from "../containers/BookmarkBarContainer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        "body": {backgroundColor: "#111", "color": "aliceblue", "height": "100%", overflowY: "hidden" },
        "padding": {"padding": "1%", height: "100%", boxSizing: "border-box"}, // reference: https://stackoverflow.com/a/41663710
        "container": {"display": "flex", "flexDirection": "column", "height": "100%"},
        "ebook_content": {}
    }),
);

const Application = () => {
    const classes = useStyles();

    return (
        <div id="react-mount" className={classes.body}>
            <div className={classes.padding}>
                <div className={classes.container}>
                    <div className="row">
                        <div className="col-md-12">
                            <LoadBookPanelContainer/>
                        </div>
                    </div>

                    <div className="row" style={{marginBottom: "1%"}}>
                        <BookmarkBarContainer/>
                    </div>

                    <div className="row" style={{height: "100%", overflow: "auto", flexGrow: 1}}>
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className={classes.ebook_content}>
                                    <BookTextAreaContainer/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default hot(Application);
