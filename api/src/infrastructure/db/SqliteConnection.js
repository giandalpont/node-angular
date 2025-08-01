import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

/**
 * Inicializa uma conexão SQLite em memória
 * @returns {Promise<import('sqlite').Database>}
 */
export async function initSqlite() {
  sqlite3.verbose();

  const db = await open({
    filename: ':memory:',
    driver: sqlite3.Database
  });

  // ATENÇÃO: template literal corretamente aberto e fechado
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS awards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    title TEXT NOT NULL,
    producer TEXT NOT NULL,
    is_winner INTEGER NOT NULL
    );
  `;

  await db.exec(createTableSQL);

  console.info('[DB] SQLite em memória inicializado e tabela "awards" criada.');
  return db;
}