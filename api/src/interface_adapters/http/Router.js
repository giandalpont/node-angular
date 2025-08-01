import { parse } from 'node:url';

export class Router {

  /**
   * Processa a requisição e retorna [statusCode, headers, body]
   * @param {import('http').IncomingMessage} req
   * @returns {Promise<[number, Object, string]>}
   */
  async route(req) {
    const { pathname } = parse(req.url, true);

    if (req.method === 'GET' && pathname === '/intervals') {
      try {
        const body = JSON.stringify({status: 'OK'});
        return [200, { 'Content-Type': 'application/json' }, body];
      } catch (err) {
        // Erro inesperado
        console.error('[Router] Erro em GET /intervals:', err);
        const errorBody = JSON.stringify({
          status: 'error',
          message: 'Erro interno ao processar sua requisição.'
        });
        return [500, { 'Content-Type': 'application/json' }, errorBody];
      }
    }

    // Rota não encontrada
    const notFoundBody = JSON.stringify({
      status: 'error',
      message: 'Rota não encontrada'
    });
    return [404, { 'Content-Type': 'application/json' }, notFoundBody];
  }
}
