import './style.css'
import { interval, of } from 'rxjs';
import { take, map, mergeMap } from 'rxjs/operators';
import { debugTap } from './operators/debugTap';

// Define source Observables
const source1$ = interval(1000).pipe(
  take(3),
  debugTap('source1$', 'interval'),
  map((x) => x * 2),
  debugTap('source1$', 'map')
);

const source2$ = of(10, 20, 30).pipe(
  debugTap('source2$', 'of'),
  mergeMap((x) =>
    source1$.pipe(debugTap('source2$', 'mergeMap'))
  )
);

// Subscribe to the final pipeline
source2$.subscribe({
  next: (value) => console.log('Final Subscriber:', value),
  error: (err) => console.error('Final Subscriber Error:', err),
  complete: () => console.log('Final Subscriber Complete'),
});
