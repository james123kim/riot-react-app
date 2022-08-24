import React from 'react';
import FilterDetails from './filterdetails';
import YourChampionFilter from './yourchampionfilter';
import AllyChampionFilter from './allychampionfilter';
import EnemyChampionFilter from './enemychampionfilter';

class FilterList extends React.Component {
    render() {
        return (
            <div id = "filter-container">
                <h4 id = "filter-title">Filter List</h4>
                <div id = "filters-and-details">
                    <div id = "filter-box" className = "filters-and-details-item">
                        <ul id = "filter-list">
                            <YourChampionFilter></YourChampionFilter>
                            <AllyChampionFilter></AllyChampionFilter>
                            <EnemyChampionFilter></EnemyChampionFilter>
                            <YourChampionFilter></YourChampionFilter>
                            <AllyChampionFilter></AllyChampionFilter>
                        </ul>
                    </div>
                    <FilterDetails></FilterDetails>
                </div>
            </div>
        );
    }
}

export default FilterList;