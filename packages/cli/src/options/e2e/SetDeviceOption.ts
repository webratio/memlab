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
import {BaseOption, constant} from '@wrtools/memlab-core';
import optionConstants from '../lib/OptionConstant';

const devices = constant.isFRL
  ? {}
  : constant.isFB
  ? require('puppeteer-core/DeviceDescriptors')
  : // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('puppeteer').KnownDevices;

export default class SetDeviceOption extends BaseOption {
  getOptionName(): string {
    return optionConstants.optionNames.DEVICE;
  }

  getDescription(): string {
    return 'set the device type to emulate';
  }

  getExampleValues(): string[] {
    return Object.keys(devices);
  }

  async parse(config: MemLabConfig, args: ParsedArgs): Promise<void> {
    const name = this.getOptionName();
    const arg = args[name];
    if (arg) {
      config.setDevice(arg, {manualOverride: true});
    }
  }
}
