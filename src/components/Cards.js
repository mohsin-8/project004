import React from 'react';
import './styles/Cards.css';

function Cards(props) {
    return (
        <div className="cards">
            {props.children}
        </div>
    )
}

export default Cards;
