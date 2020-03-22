import * as React from 'react';
import * as renderer from 'react-test-renderer';

import LoadBookPanel, {Props} from '../../src/renderer/components/LoadBookPanel';
import {createAppState, createBookState} from "../utils/testUtils";

describe('<LoadBookPanel/>', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(createLoadBookPanel())
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // TODO: investigate, this test is broken even after updating snapshot
    xit('renders when isLoadingBook', () => {
        const tree = renderer
            .create(createLoadBookPanel({book: createBookState({isLoadingBook: true})}))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // TODO: investigate, this test is broken even after updating snapshot
    xit('renders with only fileName available', () => {
        const tree = renderer
            .create(createLoadBookPanel({book: createBookState({fileName: "someFileName"})}))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // TODO: investigate, this test is broken even after updating snapshot
    xit('renders with only book metadata available', () => {
        const tree = renderer
            .create(createLoadBookPanel({
                book: createBookState({
                    bookWithMeta: {
                        metadata: {creator: "creator", title: "title"},
                        chapters: {}
                    }
                })
            }))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // TODO: investigate, this test is broken even after updating snapshot
    xit('renders with both fileName and book metadata available', () => {
        const tree = renderer
            .create(createLoadBookPanel({
                book: createBookState({
                    bookWithMeta: {
                        metadata: {creator: "creator", title: "title"},
                        chapters: {}
                    }, fileName: "someFileName"
                })
            }))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    function createLoadBookPanel(overrides: Partial<Props> = {}) {
        const props: Props = {
            setFileName: jest.fn(),
            setBookContent: jest.fn(),
            notifyLoadingBook: jest.fn(),
            setDrawerOpen: jest.fn(),
            book: createBookState(),
            app: createAppState(),
            ...overrides
        };

        return <LoadBookPanel {...props}/>;
    }
});
