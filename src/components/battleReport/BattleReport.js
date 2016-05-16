import React from 'react'
import Header from './../structure/Header'
import PlayerService from '../../services/PlayerService'
import SectorService from '../../services/SectorService'
import BattleReportService from '../../services/BattleReportService'

class BattleReport extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onChangePlayerById = this.onChangePlayerById.bind(this);
        this.onChangeSector = this.onChangeSector.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.calculatePoints = this.calculatePoints.bind(this);
        this.createNewBattleReportState = this.createNewBattleReportState.bind(this);

        this.state = {
            sectors: [],
            players: [],
            battleReport: {
                name: '',
                date: '',
                attacker: {name: ''},
                defender: {name: ''},
                winner: {name: ''},
                attackingPlayerPoints: 0,
                defendingPlayerPoints: 0,
                sector: this.props.params.sector,
                conquered: false,
                mission: ''
            }
        };
    }

    componentWillMount() {
        PlayerService.get().then(function (players) {
            this.setState({players: players});
        }.bind(this));

        SectorService.get().then(function(sectors) {
            this.setState({sectors: sectors});
        }.bind(this));
    }

    createNewBattleReportState() {
        return {
            name: this.state.battleReport.name,
            date: this.state.battleReport.date,
            attacker: this.state.battleReport.attacker,
            defender: this.state.battleReport.defender,
            winner: this.state.battleReport.winner,
            attackingPlayerPoints: this.state.battleReport.attackingPlayerPoints,
            defendingPlayerPoints: this.state.battleReport.defendingPlayerPoints,
            sector: this.state.battleReport.sector,
            conquered: this.state.battleReport.conquered,
            mission: this.state.battleReport.mission
        };
    }

    onChangeCheckbox() {
        var newBattleReportState = this.createNewBattleReportState();
        newBattleReportState.conquered = !newBattleReportState.conquered;
        this.setState({battleReport: newBattleReportState});
    }

    calculatePoints(attacker, defender) {
        var points = {
            attacker: 0,
            defender: 0
        };

        var tiles = {
            attacker: 0,
            defender: 0
        };

        this.state.sectors.forEach(function(sector) {
            if(sector.owner === attacker.name) {
                points.attacker += sector.upgrade.pointValue;
                tiles.attacker++;
            } else if(sector.owner === defender.name) {
                points.defender += sector.upgrade.pointValue;
                tiles.defender++;
            }
        });

        if(tiles.attacker > tiles.defender) {
            points.defender += (tiles.attacker - tiles.defender) * 10;
        } else if(tiles.defender > tiles.attacker) {
            points.attacker += (tiles.defender - tiles.attacker) * 10;
        }

        return points;
    }

    onChangePlayerById(event) {
        var points = [];
        var newBattleReportState = this.createNewBattleReportState();

        newBattleReportState[event.target.name] = this.state.players.find(function(player) {
            return player.name === event.target.value;
        });

        if(event.target.name === 'attacker') {
            points = this.calculatePoints(newBattleReportState[event.target.name], this.state.battleReport.defender);
            newBattleReportState.attackingPlayerPoints = points.attacker;
            newBattleReportState.defendingPlayerPoints = points.defender;
        } else if(event.target.name === 'defender') {
            points = this.calculatePoints(this.state.battleReport.attacker, newBattleReportState[event.target.name]);
            newBattleReportState.attackingPlayerPoints = points.attacker;
            newBattleReportState.defendingPlayerPoints = points.defender;
        }

        this.setState({battleReport: newBattleReportState});
    }

    onChangeSector() {
        var newBattleReportState = this.createNewBattleReportState();

        newBattleReportState[event.target.name] = this.state.sectors.find(function(sector) {
            return sector.code === event.target.value;
        });

        this.setState({battleReport: newBattleReportState});
    }

    onChange(event) {
        var newBattleReportState = this.createNewBattleReportState();

        newBattleReportState[event.target.name] = event.target.value;
        this.setState({battleReport: newBattleReportState});
    }

    handleSubmit(event) {
        event.preventDefault();

        BattleReportService.post(this.state.battleReport).then(function(response) {
            console.log(response, 'save succesfull');
        })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <section className="battleReport">
                    <h1>Create battle report</h1>
                    <h2>Sector: {this.state.battleReport.sector}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label for="name">Name:</label>
                        <input onChange={this.onChange} id="name" type="text" placeholder="Battle report name" name="name" value={this.state.battleReport.name} />

                        <label for="date">Date:</label>
                        <input onChange={this.onChange} id="date" type="date" name="date" value={this.state.battleReport.date} />

                        <label for="attacker">Attacking player:</label>
                        <select onChange={this.onChangePlayerById} id="attacker" name="attacker">
                            {this.state.players.map(function(player) {
                                return <option value={player.name}>{player.name}</option>
                            }.bind(this))}
                        </select>

                        <label for="defender">Defending player:</label>
                        <select onChange={this.onChangePlayerById} id="defender" name="defender">
                            {this.state.players.map(function(player) {
                                return <option value={player.name}>{player.name}</option>
                            }.bind(this))}
                        </select>

                        <label for="winner">Winner:</label>
                        <select onChange={this.onChangePlayerById} id="winner" name="winner">
                            <option value="Draw">Draw</option>
                            <option value={this.state.battleReport.attacker.name}>{this.state.battleReport.attacker.name}</option>
                            <option value={this.state.battleReport.defender.name}>{this.state.battleReport.defender.name}</option>
                        </select>

                        <label for="attackingPlayerPoints">Attacking player points</label>
                        <input onChange={this.onChange} id="attackingPlayerPoints" type="number" name="attackingPlayerPoints" value={this.state.battleReport.attackingPlayerPoints} />

                        <label for="defendingPlayerPoints">Defending player points</label>
                        <input onChange={this.onChange} id="defendingPlayerPoints" type="number" name="defendingPlayerPoints" value={this.state.battleReport.defendingPlayerPoints} />

                        <label for="conquered">Tile conquered:</label>
                        <input onClick={this.onChangeCheckbox} type="checkbox" checked={this.state.battleReport.conquered} id="conquered" name="conquered" value={this.state.battleReport.conquered} />


                        <button>Save</button>
                    </form>
                </section>
            </div>
        );
    }
}

module.exports = BattleReport;
