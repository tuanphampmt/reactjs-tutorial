import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {
    render() {
        return (
            <div className="row mb-10">
                <Search/>
                <Sort/>
            </div>
        );
    }
}

export default Control;