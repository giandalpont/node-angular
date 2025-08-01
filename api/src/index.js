import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { AwardRepositorySql } from "./infrastructure/db/AwardRepositorySql.js";
import { initSqlite } from "./infrastructure/db/SqliteConnection.js";
import { CsvLoader } from './infrastructure/csv/CsvLoader.js';

(async () => {
    console.log('Start');

    // Banco em memória
    const db = await initSqlite();
    
    // Repositório prêmios
    const awardRepo = new AwardRepositorySql(db);

    // Caminho absoluto para o CSV
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const csvPath = resolve(__dirname, './data/movies.csv');

    
    // Carregar CSV
    await new CsvLoader(awardRepo).load(csvPath);

    console.log(await awardRepo.findAllWinners());
    
    // 3. HTTP
    console.log('FIM');
})();
