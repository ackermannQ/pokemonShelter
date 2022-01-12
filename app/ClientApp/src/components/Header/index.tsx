import * as React from 'react';

import Hero from './Hero';
import Toolbar from './Toolbar';

export const sections = [
    { title: 'About', url: '/about' },
    { title: 'Shop', url: '/shop' },
];

export default function Header() {

    return (
        <React.Fragment>
            <Toolbar
                sections={sections}
            />
            <Hero
                title="Adopt a new friend!"
                description="All excited to meet you"
            />
        </React.Fragment>
    );
}
