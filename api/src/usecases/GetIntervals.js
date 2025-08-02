import { IntervalService } from '../domain/services/IntervalService.js';

export class GetIntervals {
  /**
   * @param {import('../domain/repositories/AwardRepository.js').AwardRepository} awardRepo
   */
  constructor(awardRepo) {
    this.awardRepo = awardRepo;
    this.intervalService = new IntervalService();
  }

  /**
   * Executa o cálculo de intervalos a partir dos vencedores.
   * @returns {Promise<{ min: Array, max: Array }>}
   */
  async execute() {
    const wins = await this.awardRepo.findAllWinners();
    return this.intervalService.calculate(wins);
  }
}
