import React from 'react'
import Header from './../structure/Header'
import BattleReportService from '../../services/BattleReportService'

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: []
        };
    }

    componentWillMount() {
        BattleReportService.get().then(function (battleReport) {
            this.setState({history: battleReport});
            console.log(battleReport);
        }.bind(this));
    }

    render() {
        return (
            <main className="history">
                <Header></Header>
                <div className="cardHolder">
                    {this.state.history.map(function(history) {
                        return <div className="mdl-card mdl-shadow--4dp card">
                            <div className="mdl-card__title mdl-card--border">
                                <h2 className="mdl-card__title-text">{history.name}</h2>
                            </div>
                            <div className="mdl-card__supporting-text">
                                <ul>
                                    <li>Date: {history.date}</li>
                                    <li>Sector: {history.sector.code}</li>
                                    <li>Attacker: {history.attacker.name}</li>
                                    <li>Defender: {history.defender.name}</li>
                                    <li>Result: {history.draw ? 'Draw' : history.winner.name + " won."}</li>
                                    {history.draw ? "" : <li>Tile conquered: {history.conquered}</li>}
                                </ul>    
                            </div>
                        </div>
                    })}
                </div>
            </main>
        );
    }
}

module.exports = History;
