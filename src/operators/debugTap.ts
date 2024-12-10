import { Observable, tap } from 'rxjs';

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
  return (source: Observable<T>) => {
    return source.pipe(
      tap({
        next: (value) =>
          console.log(`[${sourceName}] [${operatorName}] Next:`, value),
        error: (err) =>
          console.error(`[${sourceName}] [${operatorName}] Error:`, err),
        complete: () =>
          console.log(`[${sourceName}] [${operatorName}] Complete`),
        finalize: () =>
          console.log(`[${sourceName}] [${operatorName}] Finalize`),
      })
    );
  };
}
