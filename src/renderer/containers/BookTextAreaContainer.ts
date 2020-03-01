import {connect} from 'react-redux';

import BookTextArea from "../components/BookTextArea";
import {RootState} from '../reducers';

const mapStateToProps = (state: RootState) => ({
    book: state.book.bookWithMeta
});

export default connect(mapStateToProps,)(BookTextArea);
