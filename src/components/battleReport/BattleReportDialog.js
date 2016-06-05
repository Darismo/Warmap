import React from 'react'
import BattleReport from './BattleReport'

class BattleReportDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submitForm: false,
            sector: this.props.sector
        };
        this.closeModal = this.closeModal.bind(this);
        this.createBattleReport = this.createBattleReport.bind(this);
    }

    componentWillReceiveProps(props) {
        var dialog = document.getElementById('battleReportDialog');
        if(props.open) {
            dialog.showModal();
        } else if(this.props.open) {
            dialog.close();
        }
    }
    
    closeModal() {
        this.props.closeModal();
    }
    
    createBattleReport() {
        this.setState({submitForm: true});
       this.closeModal(); 
    }

    render() {
        return (
            <dialog className="mdl-dialog battleReportDialog" id="battleReportDialog">
                <h4 className="mdl-dialog__title">Battle report - Sector {this.props.sector.code}</h4>
                <div className="mdl-dialog__content">
                    <BattleReport submit={this.state.submitForm} sector={this.props.sector}></BattleReport>
                </div>
                <div className="mdl-dialog__actions">
                    <button type="button" className="mdl-button" onClick={this.createBattleReport}>Create</button>
                    <button type="button" className="mdl-button close" onClick={this.closeModal}>Close</button>
                </div>
            </dialog>
        );
    }
}

module.exports = BattleReportDialog;