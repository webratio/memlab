/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall web_perf_infra
 */

import type {IHeapSnapshot} from '@wrtools/memlab-core';
import {dumpNodeHeapSnapshot} from '@wrtools/memlab-core';
import {getFullHeapFromFile} from '@wrtools/memlab-heap-analysis';

(async function () {
  const heapFile = dumpNodeHeapSnapshot();
  const heap: IHeapSnapshot = await getFullHeapFromFile(heapFile);

  const node = heap.getNodeById(1);
  if (node) {
    console.log(node.id);
  }
})();
