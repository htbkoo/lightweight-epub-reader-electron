import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState} from '../reducers';
import {notifyLoadingBook, setBookContent} from '../actions/bookActions';
import LoadBookPanel from "../components/LoadBookPanel";
import {RootAction} from "../types";

const mapStateToProps = (state: RootState) => ({
    book: state.book.bookWithMeta
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    setBookContent: book => dispatch(setBookContent(book)),
    notifyLoadingBook: () => dispatch(notifyLoadingBook())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadBookPanel);
