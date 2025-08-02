import { createServer } from 'node:http';
import { Router } from './Router.js';

export class HttpServer {
    /**
     * @param {import('../../usecases/GetIntervals.js').GetIntervals} getIntervalsUseCase
     */
    constructor(getIntervalsUseCase) {
        this.router = new Router(getIntervalsUseCase);
        this.server = createServer(this.handleRequest.bind(this));
    }

    /**
     * Handler genérico de requisições
     * @param {import('http').IncomingMessage} req
     * @param {import('http').ServerResponse} res
     */
    async handleRequest(req, res) {
        try {
            const [status, headers, body] = await this.router.route(req);
            // Define headers
            for (const [key, value] of Object.entries(headers)) {
                res.setHeader(key, value);
            }
            res.statusCode = status;

            res.end(body);
        } catch (err) {
            // Log e suprime para não quebrar o servidor
            console.error('[HttpServer] Erro ao finalizar resposta:', err);
        }
    }

    /**
     * Inicia o servidor na porta informada
     * @param {number} port
     */
    start(port = 3333) {
        this.server.listen(port, () => {
            console.info(`[HttpServer] Servidor em http://localhost:${port}`);
        });
    }

    /**
     * Encerra o servidor (útil para testes)
     * @returns {Promise<void>}
     */
    stop() {
        return new Promise((resolve, reject) => {
            this.server.close(err => (err ? reject(err) : resolve()));
        });
    }
}
