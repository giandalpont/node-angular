/**
* Representa um prêmio (vencedor ou indicado) do Golden Raspberry Awards
* @param {Object} params
* @param {number} params.year
* @param {string} params.title
* @param {string} params.producer
* @param {boolean} params.isWinner
*/
export class Award {
    constructor({ year, title, producer, isWinner }) {
        this.year = year;
        this.title = title;
        this.producer = producer;
        this.isWinner = isWinner;
    }
}
