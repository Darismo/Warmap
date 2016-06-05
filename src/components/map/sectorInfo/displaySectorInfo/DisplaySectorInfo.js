import React from 'react'

class DisplaySectorInfo extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.createBattleReport = this.createBattleReport.bind(this);
        this.state = {visible: 'hidden'};
        this.formatUpgrade = this.formatUpgrade.bind(this);
    }

    onClick() {
        this.props.setEditMode(true);
    }

    componentWillReceiveProps(props) {
        if(props.sector.code !== undefined) {
            this.setState({visible: 'visible'});
        }
    }

    createBattleReport() {
        this.props.showBattleReportModal();
    }

    formatUpgrade() {
        var result;
        switch(this.props.sector.upgrade.name) {
            case 'Hive city':
                result = 'home';
                break;
            case 'Shield generator':
                result = 'settings input antenna';
                break;
            case 'Defensive line':
                result = 'security';
                break;
            case 'Mechanarium':
                result = 'build';
                break;
            default:
                result = 'error';
                break;
        }

        return result;
    }

    render() {
        return (
            <div className={"sectorInfo " + this.state.visible}>
                <button className="edit mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect" onClick={this.onClick}><i className="material-icons">edit</i></button>
                <ul>
                    <li>Sector {this.props.sector.code}</li>
                    <li>Owned by: {this.props.sector.owner}</li>
                    <li><span className="upgradeShorthand"><i className="material-icons">{this.formatUpgrade()}</i>{this.props.sector.upgrade.name}</span></li>
                    <li>Secured: {this.props.sector.secured}</li>
                </ul>
                <button className="battleReport mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect" onClick={this.createBattleReport} ><i className="material-icons">assignment</i></button>
            </div>
        );
    }
}

module.exports = DisplaySectorInfo;
