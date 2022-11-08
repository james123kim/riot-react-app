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

    handlePageNumberChange(e) {
        this.setState({pageNumber:parseInt(e.target.innerHTML)});
    }

    render() {
        const matches = [];
        for(let i = 1; i <= 10; i++)
        {
            if((this.state.pageNumber-1)*10+i >this.props.matchList.length )
            {
                break;
            }
            matches.push(
                <Match matchDetails = {this.props.matchList[(this.state.pageNumber-1)*10+i-1]}
                    />
            );
        }

        return (
            <div id = "match-history">
                <div id = "matches">
                    {matches}
                    <PageNavigation matchList = {this.props.matchList}
                        pageNumber = {this.state.pageNumber}
                        handlePageClick = {this.handlePageNumberChange}
                        />
                </div>
                <Sidebar />
            </div>
        );
    }
}

export default MatchHistory;