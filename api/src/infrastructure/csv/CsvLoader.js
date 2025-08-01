import fs from 'node:fs';
import readline from 'node:readline';
import { Award } from '../../domain/entities/Award.js';

export class CsvLoader {
  constructor(awardRepository) {
    this.awardRepository = awardRepository;
  }

  async load(filePath) {
    // Verifica se o arquivo existe antes de abrir
    if (!fs.existsSync(filePath)) {
      throw new Error(`[CsvLoader] Arquivo não encontrado em: ${filePath}`);
    }

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    let isHeader = true;
    for await (const line of rl) {
      if (isHeader) { isHeader = false; continue; }

      const [yearStr, title, , producers, winnerFlag] = line.split(';');
      const year = Number(yearStr);
      const isWinner = winnerFlag.trim().toLowerCase() === 'yes';

      for (const producerRaw of producers.split(',')) {
        const producer = producerRaw.trim();
        const award = new Award({ year, title, producer, isWinner });
        await this.awardRepository.save(award);
      }
    }

    console.info(`[CsvLoader] Dados carregados de ${filePath}`);
  }
}
