import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Table from './components/table'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:this.LoadUsers(),
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      users:'',
      currentUser:'',
      is_superuser:''
    };
  }
 
   LoadUsers(){
    fetch('http://127.0.0.1:8000/users/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
               
        this.setState({
          users:json
        })
      });
  }
  DeleteUser(e) {
    console.log(e.id)
    if (e.is_superuser) {
      alert("Can't delete Super User")
    } else {
      
      fetch('http://127.0.0.1:8000/users/' + e.id, {
          method: 'DELETE',
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        }).then(res => res)
        .then(json => {
        });
    }
    
  }
  get_current_User(){
    if (this.state.logged_in) {
      this.LoadUsers()
      fetch('http://127.0.0.1:8000/users/current/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          
          this.setState({ username: json.username ,
            is_superuser:json.is_superuser,
            currentUser:json
          });
        });
    }
  }
  componentWillMount() {
    this.get_current_User()
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        
        localStorage.setItem('token', json.token);
        this.LoadUsers()
        if(json.user){
          this.LoadUsers()
          this.setState({
            logged_in: true,
            displayed_form: '',
            is_superuser:json.user.is_superuser,
            username: json.user.username
          });
        }
        else{
          localStorage.removeItem('token');
          this.setState({
            logged_in: false,
            displayed_form: 'login',
            username: "Please enter the corect login details"
          });
        }
        
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/users/create-user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if(json.token){
        localStorage.setItem('token', json.token);
        this.LoadUsers()
        this.get_current_User()
        this.setState({
          logged_in: true,
          displayed_form: '',
          is_superuser:json.is_superuser,
          username: json.username
        });}
        else{
          this.setState({
            username:json.username[0]
          })
          
        }
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' ,users:'',is_superuser:false});

  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello ${this.state.username}`
            : ` ${this.state.username}`}
        </h3>
        
        {this.state.is_superuser
            ? 
            <Table
            users={this.state.users}
            handleDelete={this.DeleteUser}
            
          />
            : ''}
      </div>
    );
  }
}

export default App;