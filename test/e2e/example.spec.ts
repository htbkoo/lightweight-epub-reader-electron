import { Application } from 'spectron';
import electronPath from 'electron'; // Require Electron from the binaries included in node_modules.
import * as path from 'path';

import { APP_TITLE } from "../../src/constants/constants";

jest.setTimeout(10000);

describe('Main window', () => {
    let app: Application;

    beforeEach(() => {
        app = new Application({
            path: electronPath.toString(),
            args: [path.join(__dirname, '..', '..')],
            env: {
                NODE_ENV: "production"
                // forcing to `production` mode to disable devtool to fix the test
                // reference: https://github.com/electron-userland/spectron/issues/174#issuecomment-319242097
            }
        });

        return app.start();
    });

    afterEach(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('shows an initial window', async () => {
        const count = await app.client.getWindowCount();
        expect(count).toEqual(1);
        // Please note that getWindowCount() will return 2 if `dev tools` are opened.
        // assert.equal(count, 2)
    });

    it('opens the window', async () => {
        const { client, browserWindow } = app;

        await client.waitUntilWindowLoaded();
        const title = await browserWindow.getTitle();

        expect(title).toBe(APP_TITLE);
    });

    it('increments the counter', async () => {
        const { client } = app;

        await client.waitUntilWindowLoaded();
        await client.click('#increment');

        const counterText = await client.getText('#counter-value');

        expect(counterText).toBe('Current value: 1');
    });

    it('decrements the counter', async () => {
        const { client } = app;

        await client.waitUntilWindowLoaded();
        await client.click('#decrement');

        const counterText = await client.getText('#counter-value');

        expect(counterText).toBe('Current value: -1');
    });
});
