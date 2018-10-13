import React, {Component} from 'react';

class About extends Component {
    render () {
        return (
            <div>{`About: ${this.props.match.params.department}`}</div>
        );
    }
}

export default About;