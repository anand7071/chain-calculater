import { useState } from "react";
import FunctionCard from "../../components/FunctionCard";

export const Calculater: React.FC = () => {
  const [initialInput, setInitialInput] = useState<number>(0);
  const [equations, setEquations] = useState<string[]>(['x^2', '2*x+4', 'x^2*20', 'x-2', 'x/2']);
  const [outputs, setOutputs] = useState<number[]>([0, 0, 0, 0, 0]);

  const chainOrder = [2, 4, null, 5,3 ];

  const handleEquationChange = (id: number, equation: string) => {
    const updatedEquations = [...equations];
    updatedEquations[id - 1] = equation;
    setEquations(updatedEquations);
    calculateOutputs(initialInput, updatedEquations);
  };

  const calculateOutputs = (input: number, eqs: string[]) => {
    const results = [input];
    for (let i = 0; i < eqs.length; i++) {
      const formattedExpression = eqs[i].replace(/\^/g, '**');
      const result = eval(formattedExpression.replace(/x/g, results[i].toString()));
      results.push(result);
    }
    setOutputs(results.slice(1));
  };

  const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const value = Number(e.target.value);
    setInitialInput(value);
    calculateOutputs(value, equations);
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
  