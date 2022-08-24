import React from 'react';

class Statistics extends React.Component {
    render() {
        return (
            <div id = "statistics" className = "profile-statistics-item">
                <h3>Statistics for current set of games</h3>
                <p>winrate: 50%</p>
                <p>average CS per game: 203.8 (10.3/min)</p>
                <p>ave game time: 25.2 mins</p>
                <p>first dragon: 30%</p>
                <p>dragon soul rate: 10%, 80% none, 10% enemy</p>
                <p>first rift herald: 30%</p>
                <p>first tower: 20% (you: 70% of team's first towers)</p>
                <p>first blood: 40% (you: 80% of team's first bloods)</p>
            </div>
        );
    }
}

export default Statistics;