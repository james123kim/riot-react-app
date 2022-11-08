import React from 'react';

class PageNavigation extends React.Component {

    constructor(props) {
        super(props);

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick(e) {
        e.preventDefault();

        this.props.handlePageClick(e);
    }


    render() {
        const buttons = [];
        for(let i = 1;i<=this.props.matchList.length/10; i++)
        {
            buttons.push(
                <button 
                    className = {this.props.pageNumber === i ? "selected" : undefined}
                    onClick = {this.handlePageClick}
                    key = {i}
                >  
                    {i}
                </button>
            );
        }

        return (
            <div id='page-navigation'>
                {buttons}
            </div>
        );
    }
}

export default PageNavigation;