import React from 'react';

class PageNavigation extends React.Component {

    constructor(props) {
        super(props);

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick(e) {
        e.preventDefault();
        this.props.handlePageNumberChange(e);
    }

    

    render() {
            
        return (
            <div id='page-navigation'>
                <button onClick={this.handlePageClick} class = "selected">1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>0</button>
            </div>
        );
    }
}

export default PageNavigation;