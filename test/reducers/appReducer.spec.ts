import {appReducer} from "../../src/renderer/reducers/appReducer";
import {createAppState} from "../utils/testUtils";
import {setBookmarkDrawerOpen} from "../../src/renderer/actions/appActions";

describe('appReducer', () => {
    [
        {isBookmarkDrawerOpen: false},
        {isBookmarkDrawerOpen: true},
    ].forEach(({isBookmarkDrawerOpen}) =>
        it(`should set isBookmarkDrawerOpen to ${isBookmarkDrawerOpen}`, () => {
            // given
            const prevState = createAppState({isBookmarkDrawerOpen: !isBookmarkDrawerOpen});

            // when
            const newState = appReducer(prevState, setBookmarkDrawerOpen(isBookmarkDrawerOpen));

            // then
            expect(newState.isBookmarkDrawerOpen).toEqual(isBookmarkDrawerOpen);
        })
    );
});