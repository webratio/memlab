/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall web_perf_infra
 */

import type {IHeapSnapshot, IHeapNode} from '@wrtools/memlab-core';
import {dumpNodeHeapSnapshot} from '@wrtools/memlab-core';
import {getFullHeapFromFile} from '@wrtools/memlab-heap-analysis';

(async function () {
  const heapFile = dumpNodeHeapSnapshot();
  const heap: IHeapSnapshot = await getFullHeapFromFile(heapFile);

  // get the total number of heap objects
  heap.nodes.length;

  heap.nodes.forEach((node: IHeapNode) => {
    console.log(node.name);
  });
})();
