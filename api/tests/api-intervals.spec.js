
import request from 'supertest';
import { HttpServer } from '../src/interface_adapters/http/HttpServer.js';
import { GetIntervals } from '../src/usecases/GetIntervals.js';

describe('API /api/v1/intervals', () => {
  it('Deve retornar os intervalos corretos', async () => {
    const awards = [
      { producer: 'Joel Silver', year: 1990, isWinner: true },
      { producer: 'Joel Silver', year: 1991, isWinner: true },
      { producer: 'Matthew Vaughn', year: 2002, isWinner: true },
      { producer: 'Matthew Vaughn', year: 2015, isWinner: true }
    ];
    const awardRepo = { findAllWinners: () => Promise.resolve(awards) };
    const getIntervals = new GetIntervals(awardRepo);
    const server = new HttpServer({ getIntervalsUseCase: getIntervals });

    const response = await request(server.server).get('/api/v1/intervals');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    });
  });
});
