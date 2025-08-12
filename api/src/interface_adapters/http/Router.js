import { parse } from 'node:url';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @typedef {Object} Route
 * @property {string} method
 * @property {string} path
 * @property {(req: import('http').IncomingMessage, res: import('http').ServerResponse) => Promise<{status: number, body: any}>} handler
 */

export class Router {
    /**
     * @param {Object} useCases
     */
    constructor(useCases) {
        this.routes = [];
        this.useCases = useCases;
        this.loadRoutes();
    }

    async loadRoutes() {
        const routesDir = join(__dirname, 'routes');
        const files = readdirSync(routesDir).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const routeFile = join(routesDir, file);
            const { default: RouteClass } = await import(routeFile);
            
            if (RouteClass) {
                const routeInstance = new RouteClass(this.useCases);
                const routes = routeInstance.getRoutes();
                this.routes.push(...routes.map(route => ({...route, path: `/api/v1${route.path}`})));
            }
        }
    }

    /**
     * @param {import('http').IncomingMessage} request
     * @returns {Promise<[number, Object, string]>}
     */
    async route(request) {
        const { pathname } = parse(request.url, true);
        const matchedRoute = this.routes.find(route => route.method === request.method && route.path === pathname);

        if (matchedRoute) {
            try {
                const result = await matchedRoute.handler(request);
                const body = JSON.stringify(result.body);
                return [result.status, { 'Content-Type': 'application/json' }, body];
            } catch (err) {
                console.error(`[Router] Erro em ${request.method} ${pathname}:`, err);
                const errorBody = JSON.stringify({ status: 'error', message: 'Erro interno.' });
                return [500, { 'Content-Type': 'application/json' }, errorBody];
            }
        }

        const notFoundBody = JSON.stringify({ status: 'error', message: 'Rota não encontrada' });
        return [404, { 'Content-Type': 'application/json' }, notFoundBody];
    }
}
