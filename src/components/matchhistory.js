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

    handlePageNumberChange(e)  {
        this.setState({pageNumber:parseInt(e.target.innerHTML)});
    }

    render() {
        const matches = [];
        for(let i = 1; i <= 10; i++)
        {
            let matchNum = (this.state.pageNumber-1)*10+i;
            if(matchNum >this.props.matchList.length || 'message' in this.props.matchList[matchNum-1])
            {
                break;
            }
            matches.push(
                <Match key = {this.props.matchList[matchNum-1].metadata.matchId} 
                    matchDetails = {this.props.matchList[matchNum-1]}
                    summonerData = {this.props.summonerData}
                    onNameClick = {this.props.onNameClick}
                    convertGameVersion = {this.props.convertGameVersion}
                    versionData = {this.props.versionData}
                    queueMap = {this.props.queueMap}
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