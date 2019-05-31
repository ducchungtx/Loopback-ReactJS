import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MeetupItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li className="collection-item">
        <Link to={`/meetups/${item.id}`}>{item.name}</Link>
      </li>
    )
  }
}
