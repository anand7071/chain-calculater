export const calculateOutput = (input: number, equation: string): number => {
    const sanitizedEquation = equation.replace(/x/g, input.toString());
    return eval(sanitizedEquation);
  };