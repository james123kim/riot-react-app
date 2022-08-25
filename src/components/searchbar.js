import React from 'react';

import RegionDropdown from "./regiondropdown";
import SearchInput from "./searchinput";
import GoButton from "./gobutton";

class SearchBar extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            region: "NA",
            ingamename: "",
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(nameinput) {
        this.setState({ingamename:nameinput});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <RegionDropdown></RegionDropdown>
                <SearchInput
                    ingamename = {this.state.ingamename}
                    onNameChange = {this.handleNameChange}
                    />
                <GoButton></GoButton>
            </div>
        );
    }
}


export default SearchBar;