import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  
  const logged_out_nav = (
  
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Shaka Code</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      
    </ul>
    <span className="navbar-text">
    <ul>
       <button href={null} onClick={() => props.display_form('login')}>login</button> 
       <button href={null} onClick={() => props.display_form('signup')}>signup</button>
     </ul>
    </span>
  </div>
</nav>
  );

  const logged_in_nav = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Shaka Code</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      
    </ul>
    <span className="navbar-text">
    <ul>
      <button href={null} onClick={props.handle_logout}>logout</button>
    </ul>
    </span>
  </div>
</nav>
    
  ); 
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};