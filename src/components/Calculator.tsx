import React, { useState } from 'react';
import CalculationHistory from './CalculationHistory';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('');
    } else if (value === '=') {
      try {
        setDisplay(eval(display));
        setHistory([...history, display]);
      } catch {
        setDisplay('Error');
      }
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/', 'sin',
    '4', '5', '6', '*', 'cos',
    '1', '2', '3', '-', 'tan',
    '0', '.', '=', '+', 'C'
  ];

  return (
    <div className="flex">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-sm">
        <div className="p-2 text-right font-mono text-xl mb-2 border rounded bg-gray-100">
          {display}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {buttons.map(button => (
            <button key={button} onClick={() => handleButtonClick(button)} className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600">
              {button}
            </button>
          ))}
        </div>
      </div>
      <CalculationHistory history={history} />
    </div>
  );
};

export default Calculator;