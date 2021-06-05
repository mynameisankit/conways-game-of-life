import React from 'react';
//Custom Components
import GameOfLife from '../components/GameOfLife';

function Home(props) {
    return (
        <React.Fragment>
            <GameOfLife />
        </React.Fragment>
    );
}

export default Home;