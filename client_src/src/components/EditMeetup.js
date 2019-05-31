import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EditMeetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      city: '',
      address: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getMeetupDetails();
  }

  getMeetupDetails() {
    const meetupId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/meetups/${meetupId}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          city: response.data.city,
          address: response.data.address,
        }, () => {
          // console.log('this.state', this.state);
        });
      })
      .catch(err => console.log('err', err));
  }

  editMeetup(newMeetup) {
    axios.request({
      method: 'PUT',
      url: `http://localhost:3000/api/meetups/${this.state.id}`,
      data: newMeetup
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    e.preventDefault();
    const newMeetup = {
      name: this.refs.name.value,
      city: this.refs.city.value,
      address: this.refs.address.value,
    };
    this.editMeetup(newMeetup);    
  }

  handleInputChange(e) {
    const target = e.target;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { name, city, address } = this.state;
    return (
      <div>
        <br/>
        <Link className="btn grey" to="/">Back</Link>
        <h1>Edit Meetup</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={name} onChange={this.handleInputChange}/>
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="city" ref="city" value={city} onChange={this.handleInputChange} />
            <label htmlFor="city">City</label>
          </div>
          <div className="input-field">
            <input type="text" name="address" ref="address" value={address} onChange={this.handleInputChange} />
            <label htmlFor="address">Address</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}
