import {hot} from 'react-hot-loader/root';
import * as React from 'react';

import LoadBookPanelContainer from "../containers/LoadBookPanelContainer";
import BookTextAreaContainer from "../containers/BookTextAreaContainer";

const styles = {
    "container": {"backgroundColor": "#111", "color": "aliceblue", "min-height": "100%", "overflow-y": "hidden"},
    "body": {"padding": "25px"},
    "ebook_content": {}
};

const Application = () => {
    return (
        <div id="react-mount" className="container-fluid" style={styles.container}>
            <div style={styles.body}>
                <div className="row">
                    <div className="col-md-12">
                        <LoadBookPanelContainer/>
                    </div>
                </div>

                <div className="row">
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
    )
};

export default hot(Application);
