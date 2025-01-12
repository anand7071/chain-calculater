import { useEffect, useState } from "react";
import FunctionCard from "../../components/FunctionCard";

export const Calculater: React.FC = () => {
  const [initialInput, setInitialInput] = useState<number>(0);
  const [equations, setEquations] = useState<string[]>(['x^2', '2*x+4', 'x^2*20', 'x-2', 'x/2']);
  const [outputs, setOutputs] = useState<number[]>([0, 0, 0, 0, 0]);
  const [chainEquation,setChainEquation] = useState<string[]>([]);
  const chainOrder = [2, 4, null, 5,3 ];
  useEffect(()=>{
      const eq = [
         equations[0],
         equations[1],
         equations[3],
         equations[4],
         equations[2],
      ]
      setChainEquation(eq)
  },[equations])

  const handleEquationChange = (id: number, equation: string) => {
    const updatedEquations = [...equations];
    updatedEquations[id - 1] = equation;
    setEquations(updatedEquations);
    calculateOutputs(initialInput);
  };

  const calculateOutputs = (input: number) => {
    const results: number[] | ((prevState: number[]) => number[]) = [];
    let out = input;
    chainEquation.forEach(element => {
      const formattedExpression = element.replace(/\^/g, '**');
      const result = eval(formattedExpression.replace(/x/g, out.toString()));
      out = result
      results.push(result);
    });
    setOutputs(results);
  };

  const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const value = Number(e.target.value);
    setInitialInput(value);
    calculateOutputs(value);
  }

  return (
    <div className="flex justify-center items-center m-20" >
      <div className="flex flex-wrap justify-center gap-12 text-sm items-center">
        {equations.map((eq, idx) => (
          <FunctionCard
            key={idx}
            id={idx + 1}
            equation={eq}
            output={outputs[idx]}
            nextFunction={chainOrder[idx]}
            onEquationChange={handleEquationChange}
            onChangeInput={onChangeInput}
            initialInput={initialInput}
            finalOutput = {outputs[4]}
          />
        ))}
      </div>
    </div>
  );
  };
  