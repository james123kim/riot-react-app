import React from 'react';

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleNameChange(e.target.value);
    }

    render() {
        return (
            <input
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