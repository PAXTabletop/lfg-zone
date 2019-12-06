import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown-now';
import './index.css';
import cookie from 'react-cookies';

function GameDeleteButton ({callback}) {
    return (
        <span className='close' onClick={callback}>&times;</span>
    );
}

function Game ({title, time, table, players, deleteCallback}) {
    const players_box = players
        ? <div className='table'>Players: {players}</div>
        : ''
    return (
        <div className='game'>
            <span className='title'>{title}</span>
            {players_box}
            <div className='table'>{table}</div>
            <div className='time'><Countdown date={time} /></div>
            <GameDeleteButton callback={deleteCallback} />
        </div>
    );
}

function GameList ({games, deleteCallback}) {
    const renderedGameList = games.map((game, i) => {
        return <li key={i}><Game title={game.title} time={game.time} table={game.table} players={game.players} deleteCallback={() => deleteCallback(i)} /></li>
    });
    return (
        <ul>
            {renderedGameList}
        </ul>
    );
}

class AddGameForm extends React.Component {
    constructor(props) {
        super(props);
        this.defaultTime = 5
        this.state = {title: '', time: this.defaultTime, table: '', players: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addGame(this.state)
        this.setState({title: '', time: this.defaultTime, table: '', players: ''});
    }

    handleChange(event) {
        const newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    render() {
        return ( <form onSubmit={this.handleSubmit}>
            <label>
                Game Title
                <input required={true} type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            </label>
            <label>
                # Players
                <input required={false} type="text" name="players" value={this.state.players} onChange={this.handleChange} />
            </label>
            <label>
                Wait Time
                <input required={true} type="number" min="1" name="time" value={this.state.time} onChange={this.handleChange} />
            </label>
            <label>
                Table #
                <input required={true} type="text" name="table" value={this.state.table} onChange={this.handleChange} />
            </label>
            <input className="submitBtn" type="submit" value="Submit" />
        </form>);
    }

}

const fakeGames = [
    {title: 'Game A', time: Date.now() + 3 * 60000, table: '3', players: '4-8'},
    {title: 'Game B', time: Date.now() + 10 * 60000, table: '8'}
]


class App extends React.Component {

    constructor(props) {
        super(props);
	const games = cookie.load('games') || [];
        this.state = {games: games};
        this.gameDeleteCallback = this.gameDeleteCallback.bind(this);
        this.addGame = this.addGame.bind(this);
    }

    gameDeleteCallback (idx) {
        console.log(`game delete clicked for ${idx}`);
        const newGames = this.state.games.map(g => g);
        newGames.splice(idx, 1);
	cookie.save('games', newGames);
        this.setState({games: newGames});
    }

    addGame ({title, time, table, players}) {
        console.log(`game added: ${title} at table ${table} starting at ${time} wanting players ${players}`);
        const newGames = this.state.games.map(g => g);
        time = Date.now() + time * 60000;
        newGames.push({title, time, table, players});
	cookie.save('games', newGames)
        this.setState({games: newGames});
    }

    render () {
        return (
            <div className="container">
                <div className='game-list'><GameList games={this.state.games} deleteCallback={this.gameDeleteCallback}/></div>
                <div className='game-form'><AddGameForm addGame={this.addGame} /></div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));