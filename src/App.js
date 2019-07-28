import React from 'react';
import './App.css';
import LandingHome from './components/landingPages/LandingHome/LandingHome';
import LandingResume from './components/landingPages/LandingResume/LandingResume';
import { Locations, Location, NotFound } from 'react-router-component';
import LandingNotFound from './components/landingPages/LandingNotFound/LandingNotFound';

function App() {
  return (
    <div className="App">
      <Locations>
        <Location path='/' handler={LandingHome} />
        <Location path='/resume' handler={LandingResume} />
        <NotFound handler={LandingNotFound} />
      </Locations>
    </div>
  );
}

export default App;
