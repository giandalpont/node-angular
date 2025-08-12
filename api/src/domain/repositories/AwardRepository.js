/** Interface para repositório de prêmios */
export class AwardRepository {
  /**
   * Salva uma instância de Award.
   * @param {import('../entities/Award.js').Award} award
   * @returns {Promise<void>}
   */
  async save(award) {
    throw new Error('Method save() must be implemented');
  }

  /**
   * Retorna todos os prêmios vencedores, ordenados por produtor e ano.
   * @returns {Promise<Array<{ producer: string, year: number }>>}
   */
  async findAllWinners() {
    throw new Error('Method findAllWinners() must be implemented');
  }

  /**
   * @param {import('../entities/Award.js').Award[]} awards
   * @returns {Promise<void>}
   */
  async saveMany(awards) {
    throw new Error('Not implemented');
  }
}
