import React from 'react';

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onNameChange(e.target.value);
    }

    render() {
        const nameinput = this.props.ingamename;
        return (
            <input 
                type="text" 
                placeholder = "Summoner Name" 
                onChange= {this.handleChange}
                value ={nameinput}
            >
            </input>
        );
    }
}

export default SearchInput;