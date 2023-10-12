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

export default class OversizeThresholdOption extends BaseOption {
  getOptionName(): string {
    return optionConstants.optionNames.TRACE_OBJECT_SIZE_ABOVE;
  }

  getDescription(): string {
    return (
      'objects with retained size (bytes) ' +
      'bigger than the threshold will be considered as leaks'
    );
  }

  getExampleValues(): string[] {
    return ['1000', '1000000'];
  }

  async parse(config: MemLabConfig, args: ParsedArgs): Promise<void> {
    if (args[this.getOptionName()]) {
      const sizeThreshold = parseInt(args[this.getOptionName()], 10);
      if (!isNaN(sizeThreshold)) {
        config.oversizeObjectAsLeak = true;
        config.oversizeThreshold = sizeThreshold;
      }
    }
  }
}
