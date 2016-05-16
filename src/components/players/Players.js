import React from 'react'
import Header from './../structure/Header'
import PlayerService from '../../services/PlayerService'

class Players extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: []
        };
    }

    componentWillMount() {
        PlayerService.get().then(function (players) {
            this.setState({players: players});
        }.bind(this));
    }

    render() {
        return (
            <main className="players">
                <Header></Header>
                <div className="playerWrapper">
                    <ul>
                    {this.state.players.map(function(player) {
                        if(player.name !== 'Uncontrolled') {
                            return (
                                <li>
                                    <span className="emblem"></span>{player.name + ", Army: " + player.army}
                                </li>
                            )
                        }
                    })}
                    </ul>
                </div>
            </main>
        );
    }
}

module.exports = Players;
