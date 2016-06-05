import React from 'react'

class StadingsPlayer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <span className={"standingsPlayer " + this.props.player.name}>
            <span className={"emblem " + this.props.player.name}></span><p>{this.props.player.points}p from {this.props.player.tiles} tiles</p>
        </span>
        )
    }
}

module.exports = StadingsPlayer;
