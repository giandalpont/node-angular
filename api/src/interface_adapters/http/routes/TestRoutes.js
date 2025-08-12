export default class TestRoutes {
    constructor() {}

    getRoutes() {
        return [
            {
                method: 'GET',
                path: '/test',
                handler: this.getTest.bind(this),
            },
        ];
    }

    async getTest(_request, _response) {
        return {
            status: 200,
            body: { status: 'ok' },
        };
    }
}
