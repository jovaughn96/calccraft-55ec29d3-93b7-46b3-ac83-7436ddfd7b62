import React, { useState } from 'react';
import CalculationHistory from './CalculationHistory';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';

const Calculator: React.FC = () => {
  const { showToast, showError } = useToast();

  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('');
      showToast('Cleared');
    } else if (value === '=') {
      try {
        // Evaluating JavaScript code from user input is dangerous, here eval is still used for simplicity
        // Consider using a math library for safe evaluation
        const result = eval(display);
        setDisplay(String(result));
        setHistory([...history, display + ' = ' + result]);
      } catch {
        setDisplay('Error');
        showError('Invalid operation');
      }
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/', 'Sin',
    '4', '5', '6', '*', 'Cos',
    '1', '2', '3', '-', 'Tan',
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
            <Button key={button} onClick={() => handleButtonClick(button)}>
              {button}
            </Button>
          ))}
        </div>
      </div>
      <CalculationHistory history={history} />
    </div>
  );
};

export default Calculator;