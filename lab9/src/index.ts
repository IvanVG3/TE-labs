import './style.css';

type Student = { id: number; name: string; scores: number[] };

function safeParse(json: string): unknown {
  try { return JSON.parse(json); } catch { return undefined; }
}

function isStudent(x: unknown): x is Student {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.id === 'number' && typeof o.name === 'string' &&
    Array.isArray(o.scores) && o.scores.every(s => typeof s === 'number');
}

function average(nums: number[]): number {
  return nums.length === 0 ? 0 : nums.reduce((a, b) => a + b, 0) / nums.length;
}
const json = '{"id":1,"name":"Hermione","scores":[95, 100, 98]}';

const data = safeParse(json);
if (isStudent(data)) {
  const h1 = document.createElement('h1');
  h1.textContent = data.name;
  const p = document.createElement('p');
  p.textContent = `Promedio: ${average(data.scores).toFixed(2)}`;
  document.body.append(h1, p);
} else {
  const err = document.createElement('p');
  err.textContent = 'Error: formato inválido';
  document.body.append(err);
}