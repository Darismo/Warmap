import Service from './Service'

class BattleReportService extends Service {

    constructor() {
        super();
    }

    static get() {
        return super.httpAsync('/battleReport', 'GET');
    }

    static post(battleReport) {
        return super.httpSendAsync('/battleReport', 'POST', battleReport);
    }
}

module.exports = BattleReportService;