import { AwardRepository } from '../../domain/repositories/AwardRepository.js';

export class AwardRepositorySql extends AwardRepository {
  /**
   * @param {import('sqlite').Database} db - Instância do SQLite
   */
  constructor(db) {
    super();
    this.db = db;
  }

  /**
   * @override
   * @param {import('../../domain/entities/Award.js').Award} award
   */
  async save(award) {
    const { year, title, producer, isWinner } = award;
    await this.db.run(
      `INSERT INTO awards (year, title, producer, is_winner) VALUES (?, ?, ?, ?)`,
      [year, title, producer, isWinner ? 1 : 0]
    );
  }

  /**
   * @override
   * @returns {Promise<Array<{ producer: string, year: number }>>}
   */
  async findAllWinners() {
    // Seleciona apenas vencedores, ordenando por produtor e ano
    return this.db.all(
      `SELECT producer, year
       FROM awards
       WHERE is_winner = 1
       ORDER BY producer, year`
    );
  }
}
