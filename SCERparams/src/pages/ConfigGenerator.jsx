import React, { useState } from 'react';
import { Input } from "react-ui";
import { Label } from "react-ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "react-ui";
import { Switch } from "react-ui";
import { Button } from "react-ui";
import { Card, CardContent, CardHeader, CardTitle } from "react-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "react-ui";

const SCERPAConfigGenerator = () => {
  // Initial state based on the MATLAB configuration
  const [config, setConfig] = useState({
    solver: {
      magcadImporter: 0, // 0 for Matlab, 1 for Magcad
    },
    molecule: {
      name: 'bisfe_4',
      intermolecularDistance: 10,
    },
    circuit: {
      structure: Array(25).fill('1'), // 25 elements as in the original config
      drivers: [{ name: 'Dr1', value: -4.5 }],
    },
    stackPhase: [2],
    runtime: {
      plotIntermediateSteps: -1,
      verbosity: 2,
    },
    plotting: {
      plot1DCharge: true,
      outputPath: '',
    }
  });

  const updateConfig = (section, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const updateNestedConfig = (section, nestedSection, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: {
          ...prev[section][nestedSection],
          [key]: value
        }
      }
    }));
  };

  const handleStructureChange = (index, value) => {
    const newStructure = [...config.circuit.structure];
    newStructure[index] = value;
    setConfig(prev => ({
      ...prev,
      circuit: {
        ...prev.circuit,
        structure: newStructure
      }
    }));
  };

  const handleSaveConfig = async () => {
    try {
      // In a real app, you'd use Tauri invoke to save the configuration
      console.log('Saving configuration:', config);
      // await invoke('save_configuration', { config });
      alert('Configuration saved successfully!');
    } catch (error) {
      console.error('Failed to save configuration', error);
      alert('Failed to save configuration');
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">SCERPA Configuration Generator</h1>
      
      <Tabs defaultValue="solver">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="solver">Solver</TabsTrigger>
          <TabsTrigger value="molecule">Molecule</TabsTrigger>
          <TabsTrigger value="circuit">Circuit</TabsTrigger>
        </TabsList>
        
        {/* Solver Configuration */}
        <TabsContent value="solver">
          <Card>
            <CardHeader>
              <CardTitle>Solver Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="solver-type">Solver Type</Label>
                  <Select 
                    value={config.solver.magcadImporter.toString()} 
                    onValueChange={(value) => updateConfig('solver', 'magcadImporter', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Solver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Matlab</SelectItem>
                      <SelectItem value="1">Magcad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label htmlFor="verbosity">Verbosity Level</Label>
                  <Input 
                    type="number" 
                    value={config.runtime.verbosity}
                    onChange={(e) => updateConfig('runtime', 'verbosity', parseInt(e.target.value))}
                    min="0" 
                    max="5" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Molecule Configuration */}
        <TabsContent value="molecule">
          <Card>
            <CardHeader>
              <CardTitle>Molecule Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="molecule-name">Molecule Name</Label>
                  <Input 
                    id="molecule-name"
                    value={config.molecule.name}
                    onChange={(e) => updateNestedConfig('molecule', 'molecule', 'name', e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label htmlFor="intermolecular-distance">Intermolecular Distance</Label>
                  <Input 
                    type="number" 
                    value={config.molecule.intermolecularDistance}
                    onChange={(e) => updateNestedConfig('molecule', 'molecule', 'intermolecularDistance', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Circuit Configuration */}
        <TabsContent value="circuit">
          <Card>
            <CardHeader>
              <CardTitle>Circuit Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Label>Circuit Structure</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {config.circuit.structure.map((value, index) => (
                      <Input 
                        key={index} 
                        type="text" 
                        value={value}
                        onChange={(e) => handleStructureChange(index, e.target.value)}
                        className="w-12 text-center"
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label>Drivers</Label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Driver Name" 
                      value={config.circuit.drivers[0].name}
                      onChange={(e) => {
                        const newDrivers = [...config.circuit.drivers];
                        newDrivers[0].name = e.target.value;
                        setConfig(prev => ({
                          ...prev,
                          circuit: { ...prev.circuit, drivers: newDrivers }
                        }));
                      }}
                      className="w-24"
                    />
                    <Input 
                      type="number" 
                      placeholder="Driver Value"
                      value={config.circuit.drivers[0].value}
                      onChange={(e) => {
                        const newDrivers = [...config.circuit.drivers];
                        newDrivers[0].value = parseFloat(e.target.value);
                        setConfig(prev => ({
                          ...prev,
                          circuit: { ...prev.circuit, drivers: newDrivers }
                        }));
                      }}
                      className="w-24"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label>Stack Phase</Label>
                  <Input 
                    type="number" 
                    value={config.stackPhase[0]}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      stackPhase: [parseFloat(e.target.value)]
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Plotting Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Plotting Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="plot-1d-charge">Plot 1D Charge</Label>
              <Switch 
                checked={config.plotting.plot1DCharge}
                onCheckedChange={(checked) => updateConfig('plotting', 'plot1DCharge', checked)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="output-path">Output Path</Label>
              <Input 
                id="output-path"
                value={config.plotting.outputPath}
                onChange={(e) => updateConfig('plotting', 'outputPath', e.target.value)}
                placeholder="Enter output path"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="intermediate-steps">Plot Intermediate Steps</Label>
              <Input 
                type="number" 
                value={config.runtime.plotIntermediateSteps}
                onChange={(e) => updateConfig('runtime', 'plotIntermediateSteps', parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Save Configuration Button */}
      <div className="flex justify-center">
        <Button onClick={handleSaveConfig} className="mt-4">
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default SCERPAConfigGenerator;