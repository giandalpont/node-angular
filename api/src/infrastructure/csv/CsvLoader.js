import fs from 'node:fs';
import csv from 'csv-parser';
import { Award } from '../../domain/entities/Award.js';

export class CsvLoader {
  constructor(awardRepository, batchSize = 5000) {
    this.awardRepository = awardRepository;
    this.batchSize = batchSize;
  }

  async load(filePath) {
    // Verifica se o arquivo existe antes de abrir
    if (!fs.existsSync(filePath)) {
      throw new Error(`[CsvLoader] Arquivo não encontrado em: ${filePath}`);
    }

    return new Promise((resolve, reject) => {
      const awardsBatch = [];
      const stream = fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', async (row) => {
          if (!row || !row.year || !row.title || !row.producers || typeof row.winner === 'undefined') {
            // Pula linha malformada
            return;
          }

          const year = Number(row.year);
          const title = row.title;
          const producers = row.producers;
          const isWinner = row.winner.trim().toLowerCase() === 'yes';

          for (const producerRaw of producers.split(',')) {
            const producer = producerRaw.trim();
            if (producer) {
              awardsBatch.push(new Award({ year, title, producer, isWinner }));
            }
          }

          if (awardsBatch.length >= this.batchSize) {
            stream.pause();
            await this.awardRepository.saveMany(awardsBatch.splice(0, this.batchSize));
            stream.resume();
          }
        })
        .on('end', async () => {
          if (awardsBatch.length > 0) {
            await this.awardRepository.saveMany(awardsBatch);
          }
          console.info(`[CsvLoader] Dados carregados de ${filePath}`);
          resolve();
        })
        .on('error', (error) => {
          console.error('[CsvLoader] Erro ao processar o arquivo:', error);
          reject(error);
        });
    });
  }
}
