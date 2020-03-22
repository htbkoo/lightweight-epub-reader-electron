import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState} from '../reducers';
import {notifyLoadingBook, setBookContent, setBookFileName} from '../actions/bookActions';
import LoadBookPanel from "../components/LoadBookPanel";
import {RootAction} from "../types";
import {setBookmarkDrawerOpen} from "../actions/appActions";

const mapStateToProps = (state: RootState) => (
    state
);

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    setBookContent: book => dispatch(setBookContent(book)),
    setFileName: fileName => dispatch(setBookFileName(fileName)),
    notifyLoadingBook: () => dispatch(notifyLoadingBook()),
    setDrawerOpen: open => dispatch(setBookmarkDrawerOpen(open)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadBookPanel);
