import sqlite, { dbPath } from '../../libs/sqlite';
import { Database } from 'sqlite3';

const mockDatabaseReturn = {
    run: jest.fn((param1, param2, callback) => callback()),
    all: jest.fn((param1, param2, callback) => callback()),
    close: jest.fn()
};
jest.mock('sqlite3', () => ({
    Database: jest.fn(() => mockDatabaseReturn)
}));

const sql = 'test',
      params = { param1: 1 };

describe('Lib Sqlite', () => {
    let conn;
    beforeEach(() => {
        conn = sqlite();
    });

    it('should connect to the right db file', () => {
        expect(Database).toHaveBeenLastCalledWith(dbPath);
    });

    it('should call select and fetch all rows correctly', async () => {
        await conn.select(sql, params);
        expect(mockDatabaseReturn.all).toHaveBeenLastCalledWith(sql, params, expect.any(Function));
    });

    it('should run query correctly', async () => {
        await conn.run(sql, params);
        expect(mockDatabaseReturn.run).toHaveBeenLastCalledWith(sql, params, expect.any(Function));
    });

    it('should close db correctly', () => {
        conn.close();
        expect(mockDatabaseReturn.close).toHaveBeenCalled();
    });
});