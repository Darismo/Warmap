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
        var splits = this.props.sector.upgrade.name.split(' ');
        var result = splits[0].charAt(0).toUpperCase();

        if(splits.length > 1) {
            result = result + '.' + splits[1].charAt(0).toUpperCase();
        }

        return result;
    }

    render() {
        return (
            <div className={"sector " + this.props.sector.owner} onClick={this.onClick}>
                <div className="content"><span className={"emblem " + this.props.sector.owner}></span><span className="upgradeShorthand">{this.formatUpgrade()}</span></div>
            </div>
        );
    }
}

module.exports = Sector;
