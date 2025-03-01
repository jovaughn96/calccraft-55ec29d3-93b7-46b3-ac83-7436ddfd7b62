import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const { toast } = useToast();

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('');
    } else if (value === '=') {
      try {
        const result = eval(display);
        setDisplay(String(result));
        setHistory([...history, `${display} = ${result}`]);
        toast({ title: 'Calculation Successful', description: `${display} = ${result}` });
      } catch {
        setDisplay('Error');
        toast({ title: 'Calculation Failed', description: 'Invalid expression' });
      }
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/', '(', '4', '5', '6', '*', ')', '1', '2', '3', '-', '⌫', '0', '.', '=', '+', 'C', 'sin', 'cos', 'tan'
  ];

  const renderHistory = () => (
    <div style={{minWidth: "200px", marginLeft: "1rem", padding: "1rem", border: "1px solid var(--border)", borderRadius:"var(--radius)", background:"var(--background)" }} className="h-full overflow-y-auto">
      <h2 className="text-xl mb-2">Calculation History</h2>
      <ul style={{listStyleType: "none", paddingLeft:"0"}}>
        {history.map((entry, index) => (
          <li key={index} className="mb-2">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
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
      {renderHistory()}
    </div>
  );
};

export default Calculator;