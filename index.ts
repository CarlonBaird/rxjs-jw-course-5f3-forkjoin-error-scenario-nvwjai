import { forkJoin, Observable } from 'rxjs';

const a$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('A');
    subscriber.complete();
  }, 5000);

  //Teardown logic
  return () => {
    console.log('Teardown A');
  };
});

const b$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error('Failure');
  }, 3000);

  //Teardown logic
  return () => {
    console.log('Teardown B');
  };
});

forkJoin([a$, b$]).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log('Error:', err),
});
