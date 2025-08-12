
export default class IntervalsRoutes {
    /**
     * @param {Object} useCases
     * @param {import('../../../usecases/GetIntervals.js').GetIntervals} useCases.getIntervalsUseCase
     */
    constructor(useCases) {
        this.getIntervalsUseCase = useCases.getIntervalsUseCase;
    }

    /**
     * @returns {import('../Router.js').Route[]}
     */
    getRoutes() {
        return [
            {
                method: 'GET',
                path: '/intervals',
                handler: this.getIntervals.bind(this),
            },
        ];
    }

    async getIntervals(_request, _response) {
        const result = await this.getIntervalsUseCase.execute();
        return {
            status: 200,
            body: result,
        };
    }
}
