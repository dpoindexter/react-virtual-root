import * as React from 'react';
import { render } from 'react-testing-library';
import VirtualRoot from './VirtualRoot';

describe('Virtual Root', () => {
    it('renders', () => {
        const wrapper = render(<VirtualRoot>foo</VirtualRoot>);
    });
});
