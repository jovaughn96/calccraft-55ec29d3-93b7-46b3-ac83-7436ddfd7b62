import { useState } from 'react';
import { Button } from "./components/ui/button";
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Calculator />
    </div>
  );
}

export default App;