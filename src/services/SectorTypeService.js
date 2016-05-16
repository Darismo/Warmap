import Service from './Service'

class SectorTypeService extends Service {

    constructor() {
        super();
    }

    static get() {
        return super.httpAsync('/sectorType', 'GET');
    }
}

module.exports = SectorTypeService;