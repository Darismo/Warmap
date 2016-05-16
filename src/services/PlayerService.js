import Service from './Service'

class PlayerService extends Service {

    constructor() {
        super();
    }

    static get() {
        return super.httpAsync('/player', 'GET');
    }
}

module.exports = PlayerService;