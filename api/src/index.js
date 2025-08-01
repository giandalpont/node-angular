import { initSqlite } from "./infrastructure/db/SqliteConnection.js";

(async () => {
    console.log('Start');
    // 1. Banco em memória
    const db = await initSqlite();
    console.log('FIM');

    // 2. Carregar CSV

    // 3. HTTP
})();
