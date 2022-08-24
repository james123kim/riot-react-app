import React from 'react';
import Match from './match';
import PageNavigation from './pagenavigation';

class Matches extends React.Component {
    render() {
        return (
            <div id = "matches">
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <PageNavigation />
            </div>
        );
    }
}

export default Matches;