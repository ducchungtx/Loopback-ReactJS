import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class MeetupDetails extends Component {
  state = {
    details: ''
  }

  componentWillMount() {
    this.getMeetup();
  }

  getMeetup() {
    const meetupId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/meetups/${meetupId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          // console.log('this.state', this.state);
        });
      })
      .catch(err => console.log('err', err));
  }

  onDelete() {
    const meetupId = this.props.match.params.id;
    axios.delete(`http://localhost:3000/api/meetups/${meetupId}`)
      .then(response => {
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    const { details } = this.state;
    return (
      <div>
        <br/>
        <Link className="btn grey" to="/">Back</Link>
        <h1>{details.name}</h1>
        <ul className="collection">
          <li className="collection-item">City: {details.city}</li>
          <li className="collection-item">Address: {details.address}</li>
        </ul>
        <Link className="btn" to={`/meetups/edit/${details.id}`}>Edit</Link>
        <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
      </div>
    )
  }
}
