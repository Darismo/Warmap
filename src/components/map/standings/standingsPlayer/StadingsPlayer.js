import React from 'react'

class StadingsPlayer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <span className={"standingsPlayer " + this.props.player.name}>
            <span className={"emblem " + this.props.player.name}></span><p>Tiles: {this.props.player.tiles} Points: {this.props.player.points}p</p>
        </span>
        )
    }
}

module.exports = StadingsPlayer;
