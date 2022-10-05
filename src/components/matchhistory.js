import React from 'react';
import Match from './match';
import Sidebar from './sidebar';
import PageNavigation from './pagenavigation';

class MatchHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
        };

        this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
    }

    handlePageNumberChange(num) {
        this.setState({pageNumber:num});
    }

    render() {
        return (
            <div id = "match-history">
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
                    <PageNavigation matchList = {this.props.matchList}
                        pageNumber = {this.state.pageNumber}
                        onPageClick = {this.handlePageNumberChange}
                        />
                </div>
                <Sidebar />
            </div>
        );
    }
}

export default MatchHistory;