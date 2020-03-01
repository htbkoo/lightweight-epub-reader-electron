import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState} from '../reducers';
import {setBookContent} from '../actions/bookActions';
import LoadBookPanel from "../components/LoadBookPanel";
import {ActionType} from "typesafe-actions";

const mapStateToProps = (state: RootState) => ({
    book: state.book.bookWithMeta
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType<typeof setBookContent>>) => ({
    setBookContent: book => dispatch(setBookContent(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadBookPanel);
