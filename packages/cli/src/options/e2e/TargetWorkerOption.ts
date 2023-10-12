/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall web_perf_infra
 */

import type {ParsedArgs} from 'minimist';
import type {MemLabConfig} from '@wrtools/memlab-core';
import {BaseOption} from '@wrtools/memlab-core';
import optionConstants from '../lib/OptionConstant';

export default class TargetWorkerOption extends BaseOption {
  getOptionName(): string {
    return optionConstants.optionNames.WORKER_TITLE;
  }

  getDescription(): string {
    return (
      'set title of the target (worker) that ' +
      'needs to be selected and analyzed'
    );
  }

  getExampleValues(): string[] {
    return ['WorkerTitle'];
  }

  async parse(config: MemLabConfig, args: ParsedArgs): Promise<void> {
    const name = this.getOptionName();
    const arg = args[name];
    if (arg) {
      config.isAnalyzingMainThread = false;
      const value = Array.isArray(arg) ? arg[arg.length - 1] : arg;
      if (typeof value === 'string') {
        config.targetWorkerTitle = value;
      }
    }
  }
}
