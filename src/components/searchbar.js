import React from 'react';

import RegionDropdown from "./regiondropdown";
import SearchInput from "./searchinput";
import GoButton from "./gobutton";

class SearchBar extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div>
                <RegionDropdown></RegionDropdown>
                <SearchInput></SearchInput>
                <GoButton></GoButton>
            </div>
        );
    }
}


export default SearchBar;