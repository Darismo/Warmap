import React from 'react'

class DisplaySectorInfo extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            owner: this.props.sector.owner,
            upgrade: this.props.sector.upgrade._id,
            secured: this.props.sector.secured
        };
    }

    onClick() {
        this.props.setEditMode(false);
    }

    onChange(event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();

        var upgrade = this.props.sectorTypes.find(function(sector){
            return sector._id === this.state.upgrade;
        }.bind(this));

        var updatedSector = {
            code: this.props.sector.code,
            owner: this.state.owner,
            upgrade: upgrade,
            secured: this.state.secured
        };

        this.props.saveChanges(this.props.sector, updatedSector);
    }

    render() {
        return (
            <div>
                <h1>Edit Sector info</h1>
                <form onSubmit={this.handleSubmit}>
                    <p>Sector code: {this.props.sector.code}</p>
                    <select onChange={this.onChange} name="owner">
                        {this.props.players.map(function(player) {
                            return <option selected={player.name === this.state.owner} value={player.name}>{player.name}</option>
                        }.bind(this))}
                    </select>
                    <select onChange={this.onChange} name="upgrade">
                        {this.props.sectorTypes.map(function(sectorType) {
                            return <option selected={sectorType.name === this.props.sector.upgrade.name} value={sectorType._id}>{sectorType.name}</option>
                        }.bind(this))}
                    </select>
                    <input onChange={this.onChange} type="date" name="secured" value={this.state.secured} />
                    <button>Save</button>
                </form>
                <button onClick={this.onClick}>Cancel</button>
            </div>
        );
    }
}

module.exports = DisplaySectorInfo;
