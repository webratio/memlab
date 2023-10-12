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
import type {AnyValue} from '@wrtools/memlab-core';

import {utils} from '@wrtools/memlab-core';
import BaseOperation from './BaseOperation';

type PageFunction = (page: Page) => Promise<AnyValue>;

// Takes a pageFunction and variable name,
// calls the pageFunction with the argument 'page',
// and saves the result to the utils.memCache object with varName as the key
class CachePageContent extends BaseOperation {
  kind: string;
  private pageFunction: PageFunction;
  private varName: string;

  constructor(pageFunction: PageFunction, varName: string) {
    super();
    this.kind = 'cache-page-content';
    this.pageFunction = pageFunction;
    this.varName = varName;
  }

  async act(page: Page): Promise<void> {
    const varValue = await this.pageFunction(page);

    if (varValue == null) {
      utils.haltOrThrow(
        `CachePageContent: Provided pageFunction returned ${varValue}`,
      );
    }

    utils.memCache[this.varName] = varValue;
  }
}

export default CachePageContent;
