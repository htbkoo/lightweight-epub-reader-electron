import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState} from '../reducers';
import {notifyLoadingBook, setBookContent, setBookFileName} from '../actions/bookActions';
import LoadBookPanel from "../components/LoadBookPanel";
import {RootAction} from "../types";

const mapStateToProps = ({book}: RootState) => ({
    book
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    setBookContent: book => dispatch(setBookContent(book)),
    setFileName: fileName => dispatch(setBookFileName(fileName)),
    notifyLoadingBook: () => dispatch(notifyLoadingBook()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadBookPanel);
