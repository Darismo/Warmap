import Service from './Service'

class BattleResultService extends Service {

    constructor() {
        super();
    }

    static get() {
        return super.httpAsync('/battleResult', 'GET');
    }
}

module.exports = BattleResultService;