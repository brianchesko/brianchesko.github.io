import React from 'react';
import './App.css';
import NavBar from './components/nav/NavBar';
import NavBarItem from './components/nav/NavBarItem';
import LandingHome from './components/landingPages/LandingHome/LandingHome';
import LandingResume from './components/landingPages/LandingResume/LandingResume';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingNotFound from './components/landingPages/LandingNotFound/LandingNotFound';

function App() {
  return (
    <div className="app">
      <Router>
        <NavBar>
          <NavBarItem value="Home" to="/" key="home" />
          <NavBarItem value="Resume" to="/resume" key="resume" />
          <NavBarItem external value="GitHub" to="https://github.com/brianchesko" key="github" />
          <NavBarItem external value="LinkedIn" to="https://www.linkedin.com/in/brian-chesko-3b503a152/" key="linkedin"/>
        </NavBar>
        <Switch>
          <Route path='/' exact component={LandingHome} />
          <Route path='/resume' component={LandingResume} />
          <Route component={LandingNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
