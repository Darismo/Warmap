import React from 'react'

class Sector extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.formatUpgrade = this.formatUpgrade.bind(this);
    }

    onClick() {
        this.props.onClickCallback(this.props.sector);
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
            <div className={"sector " + this.props.sector.owner + " " + this.props.active} onClick={this.onClick}>
                <div className="content"><span className={"emblem " + this.props.sector.owner}></span><span className="upgradeShorthand"><i className="material-icons">{this.formatUpgrade()}</i></span></div>
            </div>
        );
    }
}

module.exports = Sector;
