import {connect} from 'react-redux';

import BookmarkBar from "../components/BookmarkBar";
import {RootState} from '../reducers';

const mapStateToProps = ({book}: RootState) => ({
    book
});

export default connect(mapStateToProps,)(BookmarkBar);
