import {
  startHydrogenServer,
  type HydrogenServer,
  type HydrogenSession,
} from '../utils';
import Index from '../../src/routes/index.server';
import { describe, beforeAll, beforeEach, afterAll, it, expect } from 'vitest';

const SHOP_NAME = 'Hydrogen';

describe('index', () => {
  let hydrogen: HydrogenServer;
  let session: HydrogenSession;

  beforeAll(async () => {
    hydrogen = await startHydrogenServer();
    hydrogen.watchForUpdates(Index);
  });

  beforeEach(async () => {
    session = await hydrogen.newPage();
  });

  afterAll(async () => {
    await hydrogen.cleanUp();
  });

  it('should be a 200 response', async () => {
    const response = await session.visit('/');
    expect(response!.status()).toBe(200);
  });

  it('should show the shop name', async () => {
    await session.visit('/');
    const heading = await session.page.locator('#shop-name').first();
    expect(await heading.textContent()).equal(SHOP_NAME);
  });
});
