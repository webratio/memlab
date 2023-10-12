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

import chalk from 'chalk';
import BaseCommand from '../BaseCommand';
import {defaultTestPlanner} from '@wrtools/memlab-e2e';
import {info} from '@wrtools/memlab-core';

export default class ListScenariosCommand extends BaseCommand {
  getCommandName(): string {
    return 'list';
  }

  getDescription(): string {
    return 'List all test scenarios';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(_options: CLIOptions): Promise<void> {
    const names = defaultTestPlanner.getAppNames();
    info.topLevel(
      `All available ${chalk.yellow('apps')} and ${chalk.green(
        'interactions',
      )}:`,
    );
    for (const name of names) {
      const targets = defaultTestPlanner
        .getTargetNames(name)
        .map(name => chalk.green(name))
        .join(chalk.grey(', '));
      info.topLevel(`\n${chalk.yellow(name)}: ${targets}`);
    }
    info.topLevel('');
  }
}
