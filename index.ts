import { interval } from 'rxjs';
import { concatMapTo, take } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/transformation/concatmapto
// Example 2: Using projection with concatMap

//emit val
const interval$ = interval(2000);
//emit value every second for 5 seconds
const source = interval(1000).pipe(take(5));
/*
  ***Be Careful***: In situations like this where the source emits at a faster pace
  than the inner observable completes, memory issues can arise.
  (interval emits every 1 second, basicTimer completes every 5)
*/
// basicTimer will complete after 5 seconds, emitting 0,1,2,3,4
const example = interval$.pipe(
  concatMapTo(
    source,
    (firstInterval, secondInterval) => `${firstInterval} ${secondInterval}`
  )
);
/*
  output: 0 0
          0 1
          continued...

*/
const subscribe = example.subscribe((val) => console.log(val));
