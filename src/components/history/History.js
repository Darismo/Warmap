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
        }.bind(this));
    }

    render() {
        return (
            <main className="history">
                <Header></Header>
                <h1>History</h1>
                <ul>
                    {this.state.history.map(function(history) {
                        return <li>{"Name: " + history.name + ", Date: " + history.date}</li>
                    })}
                </ul>
            </main>
        );
    }
}

module.exports = History;
