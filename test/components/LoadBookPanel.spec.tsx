import * as React from 'react';
import * as renderer from 'react-test-renderer';

import LoadBookPanel from '../../src/renderer/components/LoadBookPanel';

describe('<LoadBookPanel/>', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<LoadBookPanel loadBook={jest.fn()}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
