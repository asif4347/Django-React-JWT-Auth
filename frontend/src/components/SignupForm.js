import React from 'react';
import PropTypes from 'prop-types';
class SignupForm extends React.Component {
  state = {
    username: '',
    email:'',
    password: ''

  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          className='form-control'
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className='form-control'
          value={this.state.email}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className='form-control'
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" value='Sign Up' className='btn btn-success'/>
      </form>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
