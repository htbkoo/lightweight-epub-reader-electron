import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState} from '../reducers';
import {setBookContent, SetBookCotentAction} from '../actions/bookActions';
import LoadBookPanel from "../components/LoadBookPanel";

const mapStateToProps = (state: RootState) => ({
    book: state.book.bookWithMeta
});

const mapDispatchToProps = (dispatch: Dispatch<SetBookCotentAction>) => ({
    setBookContent: book => dispatch(setBookContent(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadBookPanel);
