import React from 'react';

class YourChampionFilter extends React.Component {
    render() {
        return (
            <li id = "your-champion-filter">
                <input type="checkbox" />
                    Your Champion: 
                    <select>
                        <option>veigar</option>
                        <option>annie</option>
                        <option>velkoz</option>
                        <option>vex</option>
                        <option>JP</option>
                        <option>LAN</option>
                        <option>LAS</option>
                        <option>BR</option>
                        <option>OCE</option>
                        <option>RU</option>
                        <option>TR</option>
                    </select>
                    change this to query from data dragon so i dont need to update champs manually
            </li>
        );
    }
}

export default YourChampionFilter;