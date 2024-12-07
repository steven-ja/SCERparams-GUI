// src/components/CircuitStructureTable.jsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // adjust import path as needed
import { Input } from '@/components/ui/input';   // adjust import path as needed

const CircuitStructureTable = ({ initialStructure, onChange }) => {

  const getCellColor = (value) => {
    const colorMap = {
      '1': '#ffcdd2', // light red
      '2': '#c8e6c9', // light green  
      '3': '#bbdefb', // light blue
      '4': '#fff9c4', // light yellow
    };
  
    if (value?.startsWith('Dr')) {
      return '#e1bee7'; // light purple for drivers
    }
    
    return colorMap[value] || 'white';
  };
  
  const TableStructure = () => {
    const [structure, setStructure] = useState([
      Array(7).fill('') // Initial 1x7 grid
    ]);
  
    const addRow = () => {
      setStructure([...structure, Array(structure[0].length).fill('')]);
    };
  
    const addColumn = () => {
      setStructure(structure.map(row => [...row, '']));
    };
  
    const removeRow = (rowIndex) => {
      if (structure.length > 1) {
        setStructure(structure.filter((_, index) => index !== rowIndex));
      }
    };
  
    const removeColumn = (colIndex) => {
      if (structure[0].length > 1) {
        setStructure(structure.map(row => row.filter((_, index) => index !== colIndex)));
      }
    };
  
    const handleCellChange = (rowIndex, colIndex, value) => {
      // Validate input
      const validValues = ['1', '2', '3', '4'];
      const driverPattern = /^(Dr\d+|Dr\d+_c)$/;
      
      if (
        validValues.includes(value) || 
        value === '' || 
        driverPattern.test(value)
      ) {
        const newStructure = [...structure];
        newStructure[rowIndex][colIndex] = value;
        setStructure(newStructure);
      }
    };
  
    return (
      <div className="flex flex-col items-center gap-4 mt-2">
        <div className="relative">
          {/* Add Column Button on top */}
          <div className="flex justify-center mb-2">
            <Button 
              onClick={addColumn}
              className="px-2 py-1"
            >
              + Column
            </Button>
          </div>
  
          <div className="flex">
            {/* Table Structure */}
            <div className="grid gap-1">
              {structure.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-1">
                  {row.map((cell, colIndex) => (
                    <Input
                      key={colIndex}
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      className="w-12 h-12 text-center"
                      style={{
                        backgroundColor: getCellColor(cell),
                        border: '1px solid #ccc'
                      }}
                    />
                  ))}
                  {/* Remove Row Button */}
                  <Button 
                    onClick={() => removeRow(rowIndex)}
                    className="ml-2 px-2 py-1"
                    variant="destructive"
                  >
                    -
                  </Button>
                </div>
              ))}
            </div>
          </div>
  
          {/* Remove Column Buttons on bottom */}
          <div className="flex gap-1 mt-2 justify-center">
            {structure[0].map((_, colIndex) => (
              <Button
                key={colIndex}
                onClick={() => removeColumn(colIndex)}
                className="px-2 py-1"
                variant="destructive"
              >
                -
              </Button>
            ))}
          </div>
  
          {/* Add Row Button */}
          <div className="flex justify-center mt-2">
            <Button 
              onClick={addRow}
              className="px-2 py-1"
            >
              + Row
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
};

export default CircuitStructureTable;
