import React from 'react'
import Map from './components/map/map/Map'
import SectorInfo from './components/map/sectorInfo/SectorInfo'
import Standings from './components/map/standings/Standings'
import Header from './components/structure/Header'
import PlayerService from './services/PlayerService'
import SectorService from './services/SectorService'
import SectorTypeService from './services/SectorTypeService'
import BattleReportDialog from './components/battleReport/BattleReportDialog'

class App extends React.Component{

  constructor() {
    super();
    this.setActiveSector = this.setActiveSector.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.showBattleReportModal = this.showBattleReportModal.bind(this);
    this.closeBattleReportModal = this.closeBattleReportModal.bind(this);
    this.state = {
      activeSector: {
        code: '',
        upgrade: {
          name: '',
          pointValue: 0
        }
      },
      sectors: [],
      players: [],
      sectorTypes: [],
      battleReportModalOpen: false
    };
  }

  componentWillMount() {
    SectorService.get().then(function(sectors) {
      this.setState({sectors: sectors});
    }.bind(this));

    PlayerService.get().then(function(players) {
      this.setState({players: players});
    }.bind(this));

    SectorTypeService.get().then(function(sectorTypes) {
      this.setState({sectorTypes: sectorTypes});
    }.bind(this));
  }

  setActiveSector(sector) {
    this.setState({activeSector: sector});
  }

  saveChanges(sector, newValues) {
    sector.code = newValues.code;
    sector.owner = newValues.owner;
    sector.upgrade = newValues.upgrade;
    sector.secured = newValues.secured;

    this.setState({sectors: this.state.sectors, activeSector: sector});

    SectorService.put(sector).then(function(response) {
      //TODO: replace with notification
      console.log(response, 'save succesfull');
    });
  }
  
  showBattleReportModal() {
    this.setState({battleReportModalOpen: true});
  }
  
  closeBattleReportModal() {
    this.setState({battleReportModalOpen: false});
  }

  render() {
    return <main className="main">
      <Header></Header>
      <section className="standings"><Standings sectors={this.state.sectors} sectorTypes={this.state.sectorTypes} activeSector={this.state.activeSector}></Standings></section>
      <BattleReportDialog open={this.state.battleReportModalOpen} closeModal={this.closeBattleReportModal} sector={this.state.activeSector}></BattleReportDialog> 
      <Map setActiveSector={this.setActiveSector} sectors={this.state.sectors} activeSector={this.state.activeSector}></Map>
      <SectorInfo ref="sectorInfo" players={this.state.players} sectorTypes={this.state.sectorTypes} sector={this.state.activeSector} showBattleReportModal={this.showBattleReportModal} saveChanges={this.saveChanges} ></SectorInfo>
    </main>
  }
}

module.exports = App;
