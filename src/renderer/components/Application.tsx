import {hot} from 'react-hot-loader/root';
import * as React from 'react';

import LoadBookPanelContainer from "../containers/LoadBookPanelContainer";
import BookTextAreaContainer from "../containers/BookTextAreaContainer";
import BookmarkBarContainer from "../containers/BookmarkBarContainer";

const styles = {
    "body": {"backgroundColor": "#111", "color": "aliceblue", "height": "100%", overflowY: "hidden" as any},
    "padding": {"padding": "1%", height: "100%", boxSizing: "border-box" as any}, // reference: https://stackoverflow.com/a/41663710
    "container": {"display": "flex" as any, "flexDirection": "column" as any, "height": "100%"},
    "ebook_content": {}
};

const Application = () => {
    return (
        <div id="react-mount" className="container-fluid" style={styles.body}>
            <div style={styles.padding}>
                <div style={styles.container}>
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
                                <div className="ebook-content panel-body" style={styles.ebook_content}>
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
