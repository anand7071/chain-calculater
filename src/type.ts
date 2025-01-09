export type FunctionCardProps = {
  id: number;
  equation: string;
  output: number;
  nextFunction: number | null;
  onEquationChange: (id: number, equation: string) => void;
  initialInput: number
  onChangeInput: (e:React.ChangeEvent<HTMLInputElement>) => void
  finalOutput : number
};