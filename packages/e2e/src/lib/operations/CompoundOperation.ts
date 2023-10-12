/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall web_perf_infra
 */

import {Page} from 'puppeteer';
import type {E2EOperation} from '@wrtools/memlab-core';
import BaseOperation from './BaseOperation';

class CompoundOperation extends BaseOperation {
  kind: string;
  protected operations: E2EOperation[];
  constructor(operations = []) {
    super();
    this.kind = 'compound';
    this.operations = operations;
  }

  async act(page: Page): Promise<void> {
    for (const op of this.operations) {
      await op.act(page);
    }
  }
}

export default CompoundOperation;
