import * as React from 'react';
import * as renderer from 'react-test-renderer';

import LoadBookPanel, {Props} from '../../src/renderer/components/LoadBookPanel';
import {createBookState} from "../utils/testUtils";

describe('<LoadBookPanel/>', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(createLoadBookPanel())
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders when isLoadingBook', () => {
        const tree = renderer
            .create(createLoadBookPanel({book: createBookState({isLoadingBook: true})}))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    function createLoadBookPanel(overrides: Partial<Props> = {}) {
        const props: Props = {
            setFileName: jest.fn(),
            setBookContent: jest.fn(),
            notifyLoadingBook: jest.fn(),
            book: createBookState(),
            ...overrides
        };

        return <LoadBookPanel {...props}/>;
    }
});
