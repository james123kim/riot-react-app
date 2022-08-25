import React from 'react';

class RegionDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleRegionChange(e.target.value);
    }

    render() {
        return (
            <select onChange = {this.handleChange} value = {this.props.region}>
                <option value = "NA1">NA</option>
                <option value = "EUN1">EUNE</option>
                <option value = "EUW1">EUW</option>
                <option value = "KR">KR</option>
                <option value = "JP">JP</option>
                <option value = "LA1">LAN</option>
                <option value = "LA2">LAS</option>
                <option value = "BR1">BR</option>
                <option value = "OC1">OCE</option>
                <option value = "RU1">RU</option>
                <option value = "TR1">TR</option>
            </select>
        );
    }
}

export default RegionDropdown;