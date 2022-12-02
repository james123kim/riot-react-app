import React from 'react';
import RegionDropdown from "./regiondropdown";
import SearchInput from "./searchinput";

class SearchBar extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(e);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <RegionDropdown 
                    handleRegionChange = {this.props.handleRegionChange}
                    region = {this.props.region}
                    />
                <SearchInput
                    handleNameChange = {this.props.handleNameChange}
                    ingamename = {this.props.ingamename}
                    />
                <input type= "submit" value = {this.props.fetching ? "loading...":"Submit"} disabled = {this.props.fetching}></input>
            </form>
        );
    }
}


export default SearchBar;