/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall web_perf_infra
 */

import type {Page} from 'puppeteer';
import {config, ErrorHandling} from '@wrtools/memlab-core';

export const testTimeout = 5 * 60 * 1000;

export const defaultAnalysisArgs = {args: {_: []}};

export const scenario = {
  app: (): string => 'test-spa',
  url: (): string => '',
  action: async (page: Page): Promise<void> =>
    await page.click('[data-testid="link-4"]'),
};

export const testSetup = (): void => {
  config.isTest = true;
  config.useXVFB = false;
  config.skipExtraOps = true;
  config.errorHandling = ErrorHandling.Throw;
};

let uindex = 1;
export function getUniqueID(): string {
  return `${process.pid}-${Date.now()}-${uindex++}`;
}
