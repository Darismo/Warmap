import Service from './Service'

class SectorService extends Service {

    constructor() {
        super();
    }

    static get() {
        return super.httpAsync('/sector', 'GET');
    }

    static put(sector) {
        return super.httpSendAsync('/sector', 'PUT', sector);
    }
}

module.exports = SectorService;