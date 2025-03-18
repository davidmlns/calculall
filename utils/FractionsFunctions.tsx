const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export const sumFractions = (a: number, b: number, c: number, d: number) => {
  const numerator = a * d + b * c;
  const denominator = b * d;
  return { numerator, denominator };
};

export const subFractions = (a: number, b: number, c: number, d: number) => {
  const numerator = a * d - b * c;
  const denominator = b * d;
  return { numerator, denominator };
};

export const mulFractions = (a: number, b: number, c: number, d: number) => {
  const numerator = a * c;
  const denominator = b * d;
  return { numerator, denominator };
};

export const simplificationFraction = (a: number, b: number) => {
  const divisor = gcd(a, b);
  const numerator = a / divisor;
  const denominator = b / divisor;
  return { numerator, denominator };
};

export const decimalToFractionFunction = (decimal: number) => {
  const tolerance = 1.0e-6;
  let numerator = 1,
    denominator = 1;
  let x = Math.abs(decimal);

  while (Math.abs(numerator / denominator - x) > tolerance) {
    if (numerator / denominator < x) {
      numerator++;
    } else {
      denominator++;
    }
  }

  const divisor = gcd(numerator, denominator);
  return {
    numerator: Math.sign(decimal) * (numerator / divisor),
    denominator: denominator / divisor,
  };
};
