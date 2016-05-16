import React from 'react'
import Sector from './sector/Sector'

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.setActiveSector = this.props.setActiveSector;
        this.sectorClicked = this.sectorClicked.bind(this);
    }

    sectorClicked(sector) {
        this.setActiveSector(sector);
    }

    prepareRows() {
        var sortedSectors = this.props.sectors.sort(function(a, b) {
            var result = 1;
            if(parseInt(a.code.split(':')[0]) < parseInt(b.code.split(':')[0])) {
                result = -1;
            } else if(parseInt(a.code.split(':')[0]) === parseInt(b.code.split(':')[0])) {
                if(parseInt(a.code.split(':')[1]) < parseInt(b.code.split(':')[1])) {
                    result = -1;
                } else {
                    result = 1;
                }
            }

            return result;
        });

        var rows = [];
        var currentRowIndex = 0;
        var children = [];

        sortedSectors.forEach(function(sector) {
            if(sector.code.split(':')[0] !== '' + currentRowIndex) {
                currentRowIndex++;
                rows.push(React.createElement('div', { className: 'row' }, children));
                children = [];
            }
            children.push(<Sector sector={sector} onClickCallback={this.sectorClicked}></Sector>);
        }.bind(this));
        rows.push(React.createElement('div', { className: 'row' }, children));

        return rows;
    }

    render() {
        return (
            <section className="map">
                {this.prepareRows()}
            </section>
        );
    }
}

module.exports = Map;