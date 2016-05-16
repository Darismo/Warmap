import React from 'react'
import { Link } from 'react-router'

class DisplaySectorInfo extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {visible: 'hidden'}
    }

    onClick() {
        this.props.setEditMode(true);
    }

    componentWillReceiveProps(props) {
        if(props.sector.code !== undefined) {
            this.setState({visible: 'visible'});
        }
    }

    render() {
        return (
            <div className={"sectorInfo " + this.state.visible}>
                <ul>
                    <li>SectorCode: {this.props.sector.code}</li>
                    <li>Owner: {this.props.sector.owner}</li>
                    <li>Upgrade: {this.props.sector.upgrade.name}</li>
                    <li>Secured: {this.props.sector.secured}</li>
                </ul>

                <button onClick={this.onClick}>Edit</button>
                <Link to={'/battleReport/' + this.props.sector.code}>Create battle report</Link>
            </div>
        );
    }
}

module.exports = DisplaySectorInfo;
