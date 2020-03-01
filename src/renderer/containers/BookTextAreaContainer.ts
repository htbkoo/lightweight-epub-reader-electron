import {connect} from 'react-redux';

import BookTextArea from "../components/BookTextArea";
import {RootState} from '../reducers';

const mapStateToProps = ({book}: RootState) => ({
    book
});

export default connect(mapStateToProps,)(BookTextArea);
