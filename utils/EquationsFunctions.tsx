export const linearEquationPlus = (a: number, b: number, c: number) => {
  const result = (c - b) / a;
  return result;
};

export const linearEquationMinus = (a: number, b: number, c: number) => {
  const result = (c + b) / a;
  return result;
};

export const quadraticEquationPlusMinus = (a: number, b: number, c: number, d: number) => {
  const cPrima = -(c + d);

  const discriminante = b * b - 4 * a * cPrima;

  if (discriminante > 0) {
    const x1 = (-b + Math.sqrt(discriminante)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminante)) / (2 * a);
    return [x1, x2];
  } else if (discriminante === 0) {
    const x = -b / (2 * a);
    return [x];
  } else {
    return 'No real solutions';
  }
};

export const quadraticEquationMinusPlus = (a: number, b: number, c: number, d: number) => {
  const bPrima = -b;
  const cPrima = c - d;

  const discriminante = bPrima * bPrima - 4 * a * cPrima;

  if (discriminante > 0) {
    const x1 = (-bPrima + Math.sqrt(discriminante)) / (2 * a);
    const x2 = (-bPrima - Math.sqrt(discriminante)) / (2 * a);
    return [x1, x2];
  } else if (discriminante === 0) {
    const x = -bPrima / (2 * a);
    return [x];
  } else {
    return 'No real solutions';
  }
};
