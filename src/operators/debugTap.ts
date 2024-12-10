import { Observable, tap } from 'rxjs';

const activeGroups = new Map<string, boolean>();

/**
 * Enhanced tap operator for debugging RxJS pipelines.
 * Logs the source Observable name and operator name for each notification.
 *
 * @param sourceName - Name of the source Observable
 * @param operatorName - Name of the operator
 * @returns A function to apply the debug tap to the Observable
 */
export function debugTap<T>(
  sourceName: string,
  operatorName: string
): (source: Observable<T>) => Observable<T> {
  const groupKey = `[${sourceName}] [${operatorName}]`;

  return (source: Observable<T>) => {
    return source.pipe(
      tap({
        next: (value) => {
          if (!activeGroups.has(groupKey)) {
            console.groupCollapsed(groupKey);
            activeGroups.set(groupKey, true);
          }
          console.log('Next:', value);
        },
        error: (err) => {
          if (!activeGroups.has(groupKey)) {
            console.groupCollapsed(groupKey);
            activeGroups.set(groupKey, true);
          }
          console.error('Error:', err);
        },
        complete: () => {
          if (!activeGroups.has(groupKey)) {
            console.groupCollapsed(groupKey);
            activeGroups.set(groupKey, true);
          }
          console.log('Complete');
          console.groupEnd();
          activeGroups.delete(groupKey);
        },
        finalize: () => {
          if (!activeGroups.has(groupKey)) {
            console.groupCollapsed(groupKey);
            activeGroups.set(groupKey, true);
          }
          console.log('Finalize');
          console.groupEnd();
          activeGroups.delete(groupKey);
        },
      })
    );
  };
}