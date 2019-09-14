import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function GameDeleteButton ({callback}) {
    return (
        <span className='close' onClick={callback}>&times;</span>
    );
}

function Game ({title, time, table, deleteCallback}) {
    return (
        <div className='game'>
            <span className='title'>{title}</span>
            <div className='time'>{time}</div>
            <div className='table'>{table}</div>
            <GameDeleteButton callback={deleteCallback} />
        </div>
    );
}

function GameList ({games, deleteCallback}) {
    const renderedGameList = games.map((game, i) => {
        return <li key={i}><Game title={game.title} time={game.time} table={game.table} deleteCallback={() => deleteCallback(i)} /></li>
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
        this.state = {title: '', time: '', table: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addGame(this.state)
        this.setState({title: '', time: '', table: ''});
    }

    handleChange(event) {
        const newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    render() {
        return ( <form onSubmit={this.handleSubmit}>
            <label>
                Game Title:
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            </label>
            <label>
                Game Start Time:
                <input type="text" name="time" value={this.state.time} onChange={this.handleChange} />
            </label>
            <label>
                Table Number:
                <input type="text" name="table" value={this.state.table} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>);
    }

}

const fakeGames = [
    {title: 'Game A', time: '5:30', table: '3'},
    {title: 'Game B', time: '5:45', table: '8'}
]

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {games: fakeGames}
        this.gameDeleteCallback = this.gameDeleteCallback.bind(this);
        this.addGame = this.addGame.bind(this);
    }

    gameDeleteCallback (idx) {
        console.log(`game delete clicked for ${idx}`);
        const newGames = this.state.games.map(g => g);
        newGames.splice(idx, 1);
        this.setState({games: newGames});
    }

    addGame ({title, time, table}) {
        console.log(`game added: ${title} at table ${table} starting at ${time}`);
        const newGames = this.state.games.map(g => g);
        newGames.push({title, time, table});
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