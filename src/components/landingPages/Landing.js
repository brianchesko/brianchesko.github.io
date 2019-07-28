import React from 'react';
import NavBar from './nav/NavBar';
import NavBarItem from './nav/NavBarItem';
import logo from '../../logo.svg';

export default function(props) {
    return (
        <div className='landing'>
            <NavBar>
                <NavBarItem value="Home" href="/"/>
                <NavBarItem value="Resume" href="/resume"/>
                <NavBarItem external value="GitHub" href="https://github.com/brianchesko" />
                <NavBarItem external value="LinkedIn" href="https://www.linkedin.com/in/brian-chesko-3b503a152/" />
            </NavBar>
            <article className='landing__content'>
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                </header> */}
                {props.children}
            </article>
        </div>

    );
}