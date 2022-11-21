import { forkJoin, Observable } from 'rxjs';

const a$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('A');
    subscriber.complete();
  }, 3000);

  //Teardown logic
  return () => {
    console.log('Teardown 1');
  };
});

const b$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error('Failure');
  }, 3000);

  //Teardown logic
  return () => {
    console.log('Teardown 2');
  };
});

forkJoin([a$, b$]).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log('Error:', err),
});
