import React from 'react'
import PlayerService from '../../services/PlayerService'
import SectorService from '../../services/SectorService'
import BattleReportService from '../../services/BattleReportService'

class BattleReport extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onChangePlayerById = this.onChangePlayerById.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.calculatePoints = this.calculatePoints.bind(this);
        this.createNewBattleReportState = this.createNewBattleReportState.bind(this);
        this.onChangeDraw = this.onChangeDraw.bind(this);

        this.state = {
            sectors: [],
            players: [],
            battleReport: {
                name: '',
                date: '',
                attacker: {name: ''},
                defender: {name: ''},
                draw: false,
                winner: {name: ''},
                attackingPlayerPoints: 0,
                defendingPlayerPoints: 0,
                sector: this.props.sector,
                conquered: false
            }
        };
    }
    
    componentWillReceiveProps(props) {
        if(props.submit) {
            this.handleSubmit();
        }
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
            draw: this.state.battleReport.draw,
            winner: this.state.battleReport.winner,
            attackingPlayerPoints: this.state.battleReport.attackingPlayerPoints,
            defendingPlayerPoints: this.state.battleReport.defendingPlayerPoints,
            sector: this.props.sector,
            conquered: this.state.battleReport.conquered
        };
    }

    onChangeCheckbox() {
        var newBattleReportState = this.createNewBattleReportState();
        newBattleReportState.conquered = !newBattleReportState.conquered;
        this.setState({battleReport: newBattleReportState});
    }

    onChangeDraw() {
        var newBattleReportState = this.createNewBattleReportState();
        newBattleReportState.draw = !newBattleReportState.draw;
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

    onChange(event) {
        var newBattleReportState = this.createNewBattleReportState();

        newBattleReportState[event.target.name] = event.target.value;
        this.setState({battleReport: newBattleReportState});
    }

    handleSubmit() {

        BattleReportService.post(this.state.battleReport).then(function(response) {
            console.log(response, 'save succesfull');
        })
    }

    render() {
        return (
                <section className="battleReport">
                    <form id="battleReportForm">
                        <div className="formItem">
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input className="mdl-textfield__input" onChange={this.onChange} id="name" type="text" name="name" value={this.state.battleReport.name} />
                                <label className="mdl-textfield__label" for="name">Battle report name</label>
                            </div>
                        </div>

                        <div className="formItem">
                            <div className="">
                                <label for="date">Date:</label>
                                <input onChange={this.onChange} id="date" type="date" name="date" value={this.state.battleReport.date} />
                            </div>
                        </div>
                        
                        <div className="formItem">
                            <span>
                                <label for="attacker">Attacker:</label>
                                <select onChange={this.onChangePlayerById} id="attacker" name="attacker">
                                    {this.state.players.map(function(player) {
                                        return <option value={player.name}>{player.name}</option>
                                    }.bind(this))}
                                </select>
                            </span>    
                            
                            <span className="pointItem">
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="text" onChange={this.onChange} pattern="-?[0-9]*(\.[0-9]+)?" id="attackingPlayerPoints" name="attackingPlayerPoints" value={this.state.battleReport.attackingPlayerPoints} />
                                    <label className="mdl-textfield__label" for="attackingPlayerPoints">Points</label>
                                    <span className="mdl-textfield__error">Input is not a number!</span>
                                </div>
                            </span>
                                
                        </div>    

                        <div className="formItem">
                            <span>
                                <label for="defender">Defender:</label>
                                <select onChange={this.onChangePlayerById} id="defender" name="defender">
                                    {this.state.players.map(function(player) {
                                        return <option value={player.name}>{player.name}</option>
                                    }.bind(this))}
                                </select>
                            </span>

                            <span className="pointItem">
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="text" onChange={this.onChange} pattern="-?[0-9]*(\.[0-9]+)?" id="defendingPlayerPoints" name="defendingPlayerPoints" value={this.state.battleReport.defendingPlayerPoints} />
                                    <label className="mdl-textfield__label" for="defendingPlayerPoints">Points</label>
                                    <span className="mdl-textfield__error">Input is not a number!</span>
                                </div>
                            </span>
                        </div>
                        
                        <div className="formItem">
                            <label for="draw" className="mdl-switch mdl-js-switch mdl-js-ripple-effect">
                                <input className="mdl-switch__input" onClick={this.onChangeDraw} type="checkbox" name="draw" id="draw" checked={this.state.battleReport.draw} value={this.state.battleReport.draw} />
                                <span className="mdl-switch__label">Draw</span>
                            </label>
                        </div>
                        
                        <div className={this.state.battleReport.draw ? "optionalForm hidden" : "optionalForm visible"}>
                            <hr />
                            <div className="formItem">
                                <label for="winner">Winner:</label>
                                <select onChange={this.onChangePlayerById} id="winner" name="winner">
                                    <option value={this.state.battleReport.attacker.name}>{this.state.battleReport.attacker.name}</option>
                                    <option value={this.state.battleReport.defender.name}>{this.state.battleReport.defender.name}</option>
                                </select>
                            </div>

                            <div className="formItem">
                                <label for="conquered" className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                                    <input type="checkbox" onClick={this.onChangeCheckbox} id="conquered" name="conquered" value={this.state.battleReport.conquered} className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">Tile conquered</span>
                                </label>
                            </div>    
                        </div>
                        
                    </form>
                </section>
        );
    }
}

module.exports = BattleReport;
