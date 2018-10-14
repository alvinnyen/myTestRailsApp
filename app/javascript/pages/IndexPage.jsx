import React, { Component } from 'react';
import { getRestaurantList } from '../dataParser.js';
import moment from 'moment';
import Card from '../components/Card.jsx';
import { Link } from 'react-router-dom';
import TimeSearchForm from '../components/TimeSearchForm.jsx';

class IndexPage extends Component {
    constructor() {
        super();
        this.state = {
            restaurantList: []
        }
    }

    componentDidMount () {
        this.setState({
            restaurantList: getRestaurantList(moment().weekday())
        });
    }

    render () {
        const {
            restaurantList = []
        } = this.state;

        return (
            <div>
                <TimeSearchForm />


                {
                    restaurantList.map((
                        {address, backgroundImgUrl, end, id, isOpen, name, start}
                    ) => {

                        return (
                            <Link
                                to={`/restaurant/${id}`}
                                key={id}
                            >
                                <Card 
                                    id={id}
                                    address={address}
                                    backgroundImgUrl={backgroundImgUrl}
                                    name={name} 
                                    start={start}
                                    end={end}
                                    isOpen={isOpen}
                                />
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
}

export default IndexPage;