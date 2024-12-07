// src/components/CircuitStructureTable.jsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus as PlusIcon, Minus as MinusIcon } from "lucide-react";

const CircuitStructureTable = ({ initialStructure, onChange }) => {
  // Initialize with a 7x4 matrix
  const [structure, setStructure] = useState(
    Array(4).fill().map(() => Array(7).fill('0')) // 4 rows × 7 columns
  );

  const getBorderColor = (val) => {
    if(['Dr1', 'Dr1_c', 'Dr2', 'Dr2_c'].includes(val)) return 'border-blue-500';
    switch(val) {
      case '1': return 'border-green-500';
      case '2': return 'border-yellow-500'; 
      case '3': return 'border-red-500';
      case '4': return 'border-purple-500';
      default: return 'border-gray-200';
    }
  };

  const addColumn = () => {
    if (structure[0].length < 16) { // Maximum 16 columns
      setStructure(prev => prev.map(row => [...row, '0']));
    }
  };

  const removeColumn = () => {
    if (structure[0].length > 1) {
      setStructure(prev => prev.map(row => row.slice(0, -1)));
    }
  };

  const addRow = () => {
    if (structure.length < 16) { // Maximum 16 rows
      setStructure(prev => [
        ...prev,
        Array(prev[0].length).fill('0')
      ]);
    }
  };

  const removeRow = () => {
    if (structure.length > 1) {
      setStructure(prev => prev.slice(0, -1));
    }
  };

  const handleCellChange = (rowIndex, colIndex, event) => {
    const value = event.target.value;
    const validValues = ['0', '1', '2', '3', '4', 'Dr1', 'Dr1_c', 'Dr2', 'Dr2_c'];
    const validPattern = /^$|^[0-4]$|^Dr[12](_c)?$/; // Empty string or valid values pattern
    
    // Allow empty string or values that could potentially become valid
    if (value === '' || validValues.includes(value) || value.startsWith('Dr')) {
      const newStructure = structure.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex ? value : cell
        )
      );
      setStructure(newStructure);
      
      // Only notify parent if the value is completely valid
      if (validValues.includes(value)) {
        onChange?.(newStructure);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex">
        {/* Main grid with cells */}
        <div className="grid gap-2">
          {structure.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((cell, colIndex) => (
                // <select
                //   key={`${rowIndex}-${colIndex}`}
                //   value={cell}
                //   onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                //   className={`w-16 h-16 text-center ${getBorderColor(cell.toString())} border-2 rounded-md`}
                // >
                //   {['0', '1', '2', '3', '4', 'Dr1', 'Dr1_c', 'Dr2', 'Dr2_c'].map(opt => (
                //     <option key={opt} value={opt}>{opt}</option>
                //   ))}
                // </select>
                <Input 
                    key={`${rowIndex}-${colIndex}`} 
                    type="text" 
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e)}
                    className="w-12 text-center text-card-foreground"
                />
              ))}
              
            </div>
          ))}
        </div>
        {/* Add/Remove column buttons on the right */}
        
          <div className="flex flex-col gap-2 ml-2">
            <Button
              onClick={addColumn}
              variant="outline"
              size="icon"
              disabled={structure[0].length >= 16}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={removeColumn}
              variant="outline"
              size="icon"
              disabled={structure[0].length <= 1}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
          </div>
        
      </div>

      {/* Add/Remove row buttons at the bottom */}
      <div className="flex gap-2">
        <Button
          onClick={addRow}
          variant="outline"
          size="icon"
          disabled={structure.length >= 16}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={removeRow}
          variant="outline"
          size="icon"
          disabled={structure.length <= 1}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CircuitStructureTable;
