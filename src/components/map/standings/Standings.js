import React from 'react'
import StandingsPlayer from './standingsPlayer/StadingsPlayer.js'

class Standings extends React.Component {

    constructor(props) {
        super(props);
        this.currentStandings = this.currentStandings.bind(this);
    }

    currentStandings() {
        var players = [];
        var playerNames = [];

        this.props.sectors.map(function (sector) {
            if(players[sector.owner] === undefined) {
                players[sector.owner] = {
                    name: sector.owner,
                    tiles: 1,
                    points: sector.upgrade.pointValue
                };

                playerNames.push(sector.owner);
            } else {
                players[sector.owner].tiles++;
                players[sector.owner].points += sector.upgrade.pointValue;
            }
        });

        return playerNames.map(function(playerName) {
            if(playerName !== 'Uncontrolled') {
                return <StandingsPlayer player={players[playerName]} />;
            }
        });
    }

    render() {
        return (
            <div className="standings">
                {this.currentStandings()}
            </div>
        );
    }
}

module.exports = Standings;
