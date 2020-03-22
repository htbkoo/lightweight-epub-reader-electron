import {connect} from 'react-redux';

import {RootState} from '../reducers';
import BookmarkDrawer from "../components/BookmarkDrawer";
import {Dispatch} from "redux";
import {RootAction} from "../types";
import {setBookmarkDrawerOpen} from "../actions/appActions";

const mapStateToProps = ({app}: RootState) => ({
    app
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    setDrawerOpen: open => dispatch(setBookmarkDrawerOpen(open)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkDrawer);
