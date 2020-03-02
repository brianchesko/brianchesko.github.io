import React from 'react';
import './App.css';
import NavBar from './components/nav/NavBar';
import NavBarItem from './components/nav/NavBarItem';
import LandingHome from './components/landingPages/LandingHome/LandingHome';
import LandingResume from './components/landingPages/LandingResume/LandingResume';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { findDOMNode } from 'react-dom';
import LandingNotFound from './components/landingPages/LandingNotFound/LandingNotFound';

/*
 * Credit to
 * https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
 */
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      findDOMNode(this).scrollTo(0, 0);
    }
  }

  render(props) {
    return (
      <div className='scroll-wrapper'>
        {this.props.children}
      </div>
    );
  }
}

const Scroll = withRouter(ScrollToTop);

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
        <Scroll>
          <Switch>
            <Route path='/' exact component={LandingHome} />
            <Route path='/resume' component={LandingResume} />
            <Route component={LandingNotFound} />
          </Switch>
        </Scroll>
      </Router>
    </div>
  );
}

export default App;
