import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState} from '../reducers';
import {setBookContent, SetBookContentAction} from '../actions/bookActions';
import LoadBookPanel from "../components/LoadBookPanel";

const mapStateToProps = (state: RootState) => ({
    book: state.book.bookWithMeta
});

const mapDispatchToProps = (dispatch: Dispatch<SetBookContentAction>) => ({
    setBookContent: book => dispatch(setBookContent(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadBookPanel);
