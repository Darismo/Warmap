import React from 'react'
import Header from './../structure/Header'
import PlayerService from '../../services/PlayerService'
import BattleResultService from '../../services/BattleResultService'

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
            BattleResultService.get().then(function(battleResults) {
                var playersWithScore = this.state.players;
                for(var i = 0; i < playersWithScore.length; i++) {
                    playersWithScore[i].wins = 0;
                    playersWithScore[i].losses = 0;
                    playersWithScore[i].draws = 0;
                    for(var j = 0; j < battleResults.length; j++) {
                        if(playersWithScore[i]._id === battleResults[j].player._id) {
                            console.log(battleResults[j].result);
                            switch(battleResults[j].result.name) {
                                case 'Wins':
                                    playersWithScore[i].wins++;
                                    break;
                                case 'Losses':
                                    playersWithScore[i].losses++;
                                    break;
                                case 'Draw':
                                    playersWithScore[i].draws++;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
                this.setState({players: playersWithScore});
                console.log(playersWithScore);
            }.bind(this));
        }.bind(this));
    }

    render() {
        return (
            <main className="players">
                <Header></Header>
                <div className="playerWrapper">
                    <ul className="mdl-list playerList">
                    {this.state.players.map(function(player) {
                        if(player.name !== 'Uncontrolled') {
                            return (
                                <li className={"mdl-list__item mdl-list__item--two-line player " + player.name}>
                                    <span className="mdl-list__item-primary-content">
                                        <i className={"mdl-list__item-icon emblem " + player.name}></i>
                                        <span>{player.name}</span>
                                        <span className="mdl-list__item-sub-title">{player.army}</span>
                                    </span>
                                    <span className="mdl-list__item-secondary-content">
                                        <ul className="scoreList">
                                            <li>Win: {player.wins || 0}</li>
                                            <li>Loss: {player.losses || 0 }</li>
                                            <li>Draw: {player.draws || 0}</li>
                                        </ul>    
                                    </span>
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
