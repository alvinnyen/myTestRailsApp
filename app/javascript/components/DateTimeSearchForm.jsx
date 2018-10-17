import React, { Component } from 'react';
import { DateTimePicker } from 'material-ui-pickers';
import moment from 'moment';
import { Link } from 'react-router-dom';

const getStyles = (nameOfBlock) => {
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center'
        },
        label: {
            // border: '2px solid red',

            fontSize: '22px',
            fontWeight: 400,
            lineHeight: 1.33,
            color: 'rgba(0, 0, 0, 0.87)',

            display: 'inline-block',
            marginRight: '20px'
        },
        dateTimePicker: {
            margin: '30px 20px 30px 0'
        },
        buttonContainer: {
            display: 'inline-block',
            padding: '4px 12px',
            color: '#fff',
            backgroundColor: 'rgb(225, 0, 80)',
            // margin: '8px',
            boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.2), 1px 1px 1px 0px rgba(0, 0, 0, 0.14), 1px 2px 1px -1px rgba(0, 0, 0, 0.12)',
            transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            lineHeight: '1.5',
            fontWeight: '500',
            borderRadius: '4px',
            textDecoration: 'none'
        }
    };

    return styles[nameOfBlock];
}

class DateTimeSearchForm extends Component {
    state = {
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
            <div 
                className="picker"
                style={ getStyles('container') }
            >
                <label style={ getStyles('label') }>
                    choose a time !!
                </label>
                <DateTimePicker
                    autoOk
                    ampm={false}
                    disableFuture
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    style={ getStyles('dateTimePicker') }
                />
                <Link 
                    to={`/search?time=${timeString}&weekday=${weekday}&datetimeMs=${datetimeMs}`}
                    style={ getStyles('buttonContainer') }
                >

                        submit
                </Link>
            </div>
        );
    }
}

export default DateTimeSearchForm;