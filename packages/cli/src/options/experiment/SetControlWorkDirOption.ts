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
import type {MemLabConfig, Nullable} from '@wrtools/memlab-core';

import {BaseOption} from '@wrtools/memlab-core';
import optionConstants from '../lib/OptionConstant';
import {extractAndCheckWorkDirs} from './ExperimentOptionUtils';

export default class SetControlWorkDirOption extends BaseOption {
  getOptionName(): string {
    return optionConstants.optionNames.CONTROL_WORK_DIR;
  }

  getDescription(): string {
    return 'set the working directory of the control run';
  }

  async parse(
    _config: MemLabConfig,
    args: ParsedArgs,
  ): Promise<{controlWorkDirs?: Nullable<string[]>}> {
    const dirs = extractAndCheckWorkDirs(this.getOptionName(), args);
    return {controlWorkDirs: dirs};
  }
}
