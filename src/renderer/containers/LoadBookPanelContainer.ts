import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState} from '../reducers';
import {loadBook, LoadBookAction} from '../actions/bookActions';
import LoadBookPanel from "../components/LoadBookPanel";

const mapStateToProps = (state: RootState) => ({
    book: state.book.bookWithMeta
});

const mapDispatchToProps = (dispatch: Dispatch<LoadBookAction>) => ({
    loadBook: book => dispatch(loadBook(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadBookPanel);
