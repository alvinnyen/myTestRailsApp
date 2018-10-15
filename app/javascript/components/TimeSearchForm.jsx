import React, { Component } from 'react';
import TimeInput from 'material-ui-time-picker'
import moment from 'moment';
import { Link } from 'react-router-dom';

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
        const {
            time = new Date()
        } = this.state;

        const timeString = moment(time).format('HHmm');

        return (
            <div>
                <TimeInput
                    mode='24h'
                    value={this.state.time}
                    onChange={dateInstance => this.handleChange(dateInstance)}
                />
                <Link to={`/search?time=${timeString}`}>
                    <button>
                        Search it !
                    </button>
                </Link>
            </div>
        )
    }
}

export default TimeSearchForm;