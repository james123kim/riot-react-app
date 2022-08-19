import React from 'react';

class RegionDropdown extends React.Component {
    render() {
        return (
            <select>
                <option>NA</option>
                <option>EUNE</option>
                <option>EUW</option>
                <option>KR</option>
                <option>JP</option>
                <option>LAN</option>
                <option>LAS</option>
                <option>BR</option>
                <option>OCE</option>
                <option>RU</option>
                <option>TR</option>
            </select>
        );
    }
}

export default RegionDropdown;