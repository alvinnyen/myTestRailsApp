import React, { Component } from 'react';
import { DateTimePicker } from 'material-ui-pickers';
import moment from 'moment';

class TestPage extends Component {
    state = {
        // selectedDate: new Date('2018-01-01T00:00:00.000Z'),
        selectedDate: new Date(),
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    render() {
        const { selectedDate } = this.state;
        console.log(selectedDate);
        console.log(moment(selectedDate));
        console.log(moment(selectedDate).weekday());
        console.log(' ');

        return (
            <div className="picker">
                <DateTimePicker
                    autoOk
                    ampm={false}
                    disableFuture
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    label="24h clock"
                />
            </div>
        );
    }
}

export default TestPage;