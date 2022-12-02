import React from 'react';

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleNameChange(e.target.value);
    }

    handleNameClick(name)
    {
        this.innerHTML = name;
    }

    render() {
        return (
            <input
                id = 'searchinput'
                type="text"
                placeholder = "Summoner Name"
                onChange = {this.handleChange}
                value = {this.props.ingamename}
            >
            </input>
        );
    }
}

export default SearchInput;