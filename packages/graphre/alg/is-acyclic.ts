import { topsort, CycleException } from './topsort';
import { GraphLike } from '../graph';

export function isAcyclic(g: GraphLike): boolean {
  try {
    topsort(g);
  } catch (e) {
    if (e instanceof CycleException) {
      return false;
    }
    throw e;
  }
  return true;
}
