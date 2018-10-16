import React, { Component } from 'react';
import { DateTimePicker } from 'material-ui-pickers';
import moment from 'moment';
import { Link } from 'react-router-dom';

class DateTimeSearchForm extends Component {
    state = {
        // selectedDate: new Date('2018-01-01T00:00:00.000Z'),
        selectedDate: new Date(),
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    render() {
        const { selectedDate } = this.state;
        // console.log(selectedDate);
        // console.log(moment(selectedDate));
        // console.log(moment(selectedDate).weekday());
        // console.log(' ');

        const timeString = moment(selectedDate).format('HHmm');
        const weekday = moment(selectedDate).weekday();

        // label="24h clock"
        const datetimeMs = moment(selectedDate);

        return (
            <div className="picker">
                <DateTimePicker
                    autoOk
                    ampm={false}
                    disableFuture
                    value={selectedDate}
                    onChange={this.handleDateChange}
                />
                <Link to={`/search?time=${timeString}&weekday=${weekday}&datetimeMs=${datetimeMs}`}>
                    <button>
                        Search it !
                    </button>
                </Link>
            </div>
        );
    }
}

export default DateTimeSearchForm;