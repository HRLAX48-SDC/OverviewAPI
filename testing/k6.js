import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 1000,
  duration: '15s',
  // stages: [
  //   { duration: '3s', target: 500 },
  //   { duration: '8s', target: 1000 },
  //   { duration: '3s', target: 500 },
  // ],
};

let randomNum = Math.floor(Math.random() * 10000);

const url = `http://localhost:3000/api/products/${randomNum}/styles`;

export default function () {
  const res = http.get(url);
  sleep(1);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'transaction time < 200ms': (r) => r.timings.duration < 200,
    'transaction time 500ms': (r) => r.timings.duration < 500,
    'transaction time < 1000ms': (r) => r.timings.duration < 1000,
    'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  });
}
