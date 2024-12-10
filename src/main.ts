import './style.css'
import { interval, of } from 'rxjs';
import { take, map, mergeMap } from 'rxjs/operators';
import { debugTap } from './operators/debugTap';

// Define source Observables
const secs$ = interval(1000).pipe(
  take(3),
  debugTap('secs$', 'interval'),
  map((x) => x * 2),
  debugTap('secs$', 'map')
);

const source2$ = of(10, 20, 30).pipe(
  debugTap('source2$', 'of'),
  mergeMap((x) =>
    secs$.pipe(debugTap('source2$', 'mergeMap'))
  )
);

// Subscribe to the final pipeline
source2$.subscribe({
  next: (value) => console.log('Final Subscriber:', value),
  error: (err) => console.error('Final Subscriber Error:', err),
  complete: () => console.log('Final Subscriber Complete'),
});
