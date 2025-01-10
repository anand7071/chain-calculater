import { SixDotIcon } from "../../asset/sixDotIcon";
import { FunctionCardProps } from "../../type";
import Connector from "../Connectors/Conectors";


const RadioCircle = (props: { id: string }) => {
  return (
    <div className="">
      <div className="size-4 flex items-center justify-center rounded-full bg-gray-300" {...props}>
        <div className="size-3 flex items-center justify-center rounded-full bg-white">
          <div className="size-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export const FunctionCard: React.FC<FunctionCardProps> = ({
  id,
  equation,
  output,
  nextFunction,
  onEquationChange,
  initialInput,
  onChangeInput,
  finalOutput
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEquationChange(id, e.target.value);
  };
  console.log(output, id)
  return (
    <div className="relative flex-2">
      {id === 1 && <div className="absolute bottom-0 -left-32 w-28 flex flex-col">
        <div className="bg-yellow-500 text-zinc-100 rounded-md text-xs mb-2 p-2">Initial Value of x:</div>
        <div className="flex gap-1 border border-yellow-500 rounded-lg p-1 w-full justify-center items-center">
          <input
            id="intialInput"
            type="number"
            value={initialInput}
            onChange={onChangeInput}
            className="text-lg p-1 w-16"
          />
          <div className="h-10 border border-yellow-100"></div>
          <RadioCircle id="intialIput" />
          {id === 1 && <Connector originId="intialIput" targetId={"inputId-1"} />}
        </div>
      </div>}
      <div className="border rounded-lg p-4 shadow-md w-64">
        <div className="mb-4 text-gray-300 flex gap-1 items-center">
          <SixDotIcon className="text-gray-300 size-5" />
          <div className="text-lg font-semibold">Function: {id}</div>
        </div>
        <div className="mb-4">
          <label htmlFor="equation" className="block text-sm font-medium text-gray-700">
            Equation
          </label>
          <input
            type="text"
            value={equation}
            onChange={handleInputChange}
            placeholder="Enter equation"
            className="mt-1 p-2 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nextFunction" className="block text-sm font-medium text-gray-700">
            Next function
          </label>
          <select
            disabled
            value={nextFunction ?? ''}
            id="nextFunction"
            className="mt-1 p-2 bg-gray-100 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {nextFunction ? <option value={nextFunction}>Function {nextFunction}</option> : <option>-</option>}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <RadioCircle id={`inputId-${id}`} />
            {/* <span className="text-sm text-gray-600">{equation}</span> */}
            <span className="text-sm text-gray-600">input</span>
          </div>
          <div className="flex items-center gap-2" >
            {/* <span className="text-sm text-gray-600">Output: {output}</span> */}
            <span className="text-sm text-gray-600">Output</span>
            <RadioCircle id={`outputId-${id}`} />
          </div>
        </div>
        {nextFunction && <Connector originId={`outputId-${id}`} targetId={`inputId-${nextFunction}`}/>}
      </div>
      {!nextFunction && <div className="absolute bottom-0 -right-32 w-28 flex flex-col">
        <div className="bg-green-500 text-zinc-100 rounded-md text-xs mb-2 p-2">
          Final Output y
        </div>
        <div className="flex gap-2 items-center border border-green-500 rounded-lg p-1 h-12 ">
          <RadioCircle id="finalOutput" />
          <div className="h-11 border border-green-100"></div>
          <div className="text-lg">{finalOutput}</div>
        </div>
        {!nextFunction && <Connector originId={`outputId-${id}`} targetId={"finalOutput"} />}
      </div>}
    </div>
  );
};