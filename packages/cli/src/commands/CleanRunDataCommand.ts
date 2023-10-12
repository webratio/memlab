/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall web_perf_infra
 */

import type {CLIOptions, Optional} from '@wrtools/memlab-core';

import BaseCommand from '../BaseCommand';
import {fileManager, BaseOption} from '@wrtools/memlab-core';
import SetWorkingDirectoryOption from '../options/SetWorkingDirectoryOption';

export default class CleanRunDataCommand extends BaseCommand {
  getCommandName(): string {
    return 'clear-run-data';
  }

  getDescription(): string {
    return 'remove all web page E2E data generated from memlab runs';
  }

  isInternalCommand(): boolean {
    return true;
  }

  getOptions(): BaseOption[] {
    return [new SetWorkingDirectoryOption()];
  }

  async run(options: CLIOptions): Promise<void> {
    const workDir = options.configFromOptions?.workDir as Optional<string>;
    fileManager.clearDataDirs({workDir});
  }
}
