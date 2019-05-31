import React, { Component } from 'react';
import axios from 'axios';
import MeetupItem from './/MeetupItem';

export default class Meetups extends Component {
  state = {
    meetups: []
  }

  componentDidMount() {
    this.getMeetups();
  }

  getMeetups = () => {
    axios.get('http://localhost:3000/api/meetups')
      .then(response => {
        this.setState({ meetups: response.data }, () => {
          // console.log('this.state', this.state);
        });
      })
      .catch(err => console.log('err', err));
  }

  render() {
    const meetupItems = this.state.meetups.map(meetup => {
      return(
        <MeetupItem key={meetup.id} item={meetup} />
      )
    })
    return (
      <div>
        <h1>Meetups</h1>
        <ul className="collection">
          {meetupItems}
        </ul>
      </div>
    )
  }
}
