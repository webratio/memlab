/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall web_perf_infra
 */

import type {CLIOptions} from '@wrtools/memlab-core';

import {BaseOption} from '@wrtools/memlab-core';
import BaseCommand, {CommandCategory} from '../../BaseCommand';
import {BaseAnalysis} from '@wrtools/memlab-heap-analysis';

export default class HeapAnalysisSubCommandWrapper extends BaseCommand {
  private heapAnalysis: BaseAnalysis;

  constructor(analysis: BaseAnalysis) {
    super();
    this.heapAnalysis = analysis;
  }

  getCommandName(): string {
    return this.heapAnalysis.getCommandName();
  }

  getDescription(): string {
    return this.heapAnalysis.getDescription();
  }

  getCategory(): CommandCategory {
    return CommandCategory.COMMON;
  }

  getOptions(): BaseOption[] {
    return this.heapAnalysis.getOptions();
  }

  async run(options: CLIOptions): Promise<void> {
    await this.heapAnalysis.run({args: options.cliArgs});
  }
}
