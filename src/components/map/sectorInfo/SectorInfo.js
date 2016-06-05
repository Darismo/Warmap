import React from 'react'
import DisplaySectorInfo from './displaySectorInfo/DisplaySectorInfo'
import EditSectorInfo from './editSectorInfo/EditSectorInfo'

class SectorInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
        this.setEditMode = this.setEditMode.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.showBattleReportModal = this.showBattleReportModal.bind(this);
    }

    setEditMode(editMode) {
        this.setState({editMode: editMode});
    }

    saveChanges(sector, newValues) {
        this.setState({editMode: false});
        this.props.saveChanges(sector, newValues);
    }

    showBattleReportModal() {
        this.props.showBattleReportModal();
    }

    render() {
        return (
            <div className="sectorInfo">
                {this.state.editMode ? <EditSectorInfo sector={this.props.sector} sectorTypes={this.props.sectorTypes} players={this.props.players} saveChanges={this.saveChanges} setEditMode={this.setEditMode} /> : <DisplaySectorInfo sector={this.props.sector} showBattleReportModal={this.showBattleReportModal} setEditMode={this.setEditMode}/>}
            </div>
        );
    }
}

module.exports = SectorInfo;
