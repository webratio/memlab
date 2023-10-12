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

import cp from 'child_process';
import BaseCommand from '../../BaseCommand';
import {config, info} from '@wrtools/memlab-core';

export default class CheckXvfbSupportCommand extends BaseCommand {
  getCommandName(): string {
    return 'check-xvfb';
  }

  getDescription(): string {
    return 'if Xvfb is installed on the machine, enable it';
  }

  isInternalCommand(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(_options: CLIOptions): Promise<void> {
    try {
      const ret = cp.execSync('command -v xvfb-run').toString();
      if (ret) {
        config.machineSupportsXVFB = true;
      }
    } catch {
      // the env doesn't support XVFB, no need to do anything;
    }
    if (config.verbose) {
      info.lowLevel(`Xvfb supports: ${config.machineSupportsXVFB}`);
    }
  }
}
