/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall web_perf_infra
 */

import {IHeapEdge, IHeapNode, IHeapSnapshot, utils} from '@wrtools/memlab-core';
import type {
  AnalyzeSnapshotResult,
  HeapAnalysisOptions,
} from '../../PluginUtils';

import {BaseOption} from '@wrtools/memlab-core';
import SnapshotFileOption from '../../options/HeapAnalysisSnapshotFileOption';
import BaseAnalysis from '../../BaseAnalysis';
import pluginUtils from '../../PluginUtils';
import windowBuiltInVars from './BuiltInGlobalVariables';

class GlobalVariableAnalysis extends BaseAnalysis {
  getCommandName(): string {
    return 'global-variable';
  }

  /** @internal */
  getDescription(): string {
    return 'Get global variables in heap';
  }

  /** @internal */
  getOptions(): BaseOption[] {
    return [new SnapshotFileOption()];
  }

  /** @internal */
  async process(options: HeapAnalysisOptions): Promise<void> {
    const snapshot = await pluginUtils.loadHeapSnapshot(options);
    const list = this.getGlobalVariables(snapshot);
    pluginUtils.printReferencesInTerminal(list);
  }

  /** @internal */
  public async analyzeSnapshotsInDirectory(
    directory: string,
  ): Promise<AnalyzeSnapshotResult> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const d = directory;
    throw utils.haltOrThrow(
      `${this.constructor.name} does not support analyzeSnapshotsInDirectory`,
    );
  }

  private shouldFilterOutEdge(edge: IHeapEdge): boolean {
    if (windowBuiltInVars.has(`${edge.name_or_index}`)) {
      return true;
    }
    const toNodeType = edge.toNode.type;
    if (edge.name_or_index === '<symbol>') {
      return true;
    }
    if (
      toNodeType === 'hidden' ||
      toNodeType === 'array' ||
      toNodeType === 'number'
    ) {
      return true;
    }
    return false;
  }

  /** @internal */
  private getGlobalVariables(snapshot: IHeapSnapshot): IHeapEdge[] {
    const ret: IHeapEdge[] = [];
    const processNode = (node: IHeapNode) => {
      if (!node.name.startsWith('Window ')) {
        return;
      }
      const refs = node.references;
      for (const edge of refs) {
        if (!this.shouldFilterOutEdge(edge)) {
          ret.push(edge);
        }
      }
    };
    snapshot.nodes.forEach(processNode);

    return ret.sort(
      (e1, e2) => e2.toNode.retainedSize - e1.toNode.retainedSize,
    );
  }
}

export default GlobalVariableAnalysis;
