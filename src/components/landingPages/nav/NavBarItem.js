import React from 'react';
import ActiveLink from './ActiveLink/ActiveLink';

export default function(props) {
    return (
        <li className='nav-bar__item'>
            {props.external ? 
                <ActiveLink global href={props.href}>
                    {props.value}
                </ActiveLink>
                :
                <ActiveLink href={props.href}>
                    {props.value}
                </ActiveLink>
        }
        </li>
    );
}