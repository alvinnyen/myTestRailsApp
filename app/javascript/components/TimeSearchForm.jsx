import React, { Component } from 'react';
import TimeInput from 'material-ui-time-picker'

class TimeSearchForm extends Component {
    constructor() {
        super();

        this.state = {
            time: new Date()
        };
    }

    handleChange = dateInstance => {
        this.setState({
            time: dateInstance
        })
    }

    render() {
        return (
            <TimeInput
                mode='24h'
                value={this.state.time}
                onChange={dateInstance => this.handleChange(dateInstance)}
            />
        )
    }
}

export default TimeSearchForm;