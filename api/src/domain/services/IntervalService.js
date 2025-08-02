export class IntervalService {
  /**
   * Calcula os intervalos mínimo e máximo de vitórias consecutivas.
   * @param {Array<{ producer: string, year: number }>} wins
   * @returns {{ min: Array, max: Array }}
   */
  calculate(wins) {
    // Agrupa anos por produtor
    const map = new Map();
    wins.forEach(({ producer, year }) => {
      if (!map.has(producer)) map.set(producer, []);
      map.get(producer).push(year);
    });

    // Calcula intervalos
    const intervals = [];
    for (const [producer, years] of map.entries()) {
      if (years.length < 2) continue; // precisa de ao menos 2 vitórias
      const sorted = years.sort((a, b) => a - b);
      for (let i = 1; i < sorted.length; i++) {
        intervals.push({
          producer,
          interval: sorted[i] - sorted[i - 1],
          previousWin: sorted[i - 1],
          followingWin: sorted[i]
        });
      }
    }

    if (intervals.length === 0) {
      return { min: [], max: [] };
    }

    // Encontra menor e maior intervalos
    const minInterval = Math.min(...intervals.map(i => i.interval));
    const maxInterval = Math.max(...intervals.map(i => i.interval));

    // Filtra produtores que empatam nos extremos
    return {
      min: intervals.filter(i => i.interval === minInterval),
      max: intervals.filter(i => i.interval === maxInterval)
    };
  }
}
