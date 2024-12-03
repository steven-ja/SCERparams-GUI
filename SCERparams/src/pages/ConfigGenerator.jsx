import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



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
      structure: Array(25).fill('0'), // 25 elements as in the original config
      drivers: [{ name: 'Dr1', value: -4.5 }],
    },
    stackPhase: [2],
    runtime: {
      plotIntermediateSteps: -1,
      verbosity: 2,
    },
//      %PLOT settings
// plotSettings.plot_waveform = 1;
// plotSettings.plot_3dfig = 1;
// plotSettings.plot_1DCharge = 1;
// plotSettings.plot_logic = 1;
// plotSettings.plot_potential = 1;
// plotSettings.plotSpan = 3;
// plotSettings.fig_saver = 1;
// plotSettings.plotList = 0;
    plotting: {
      plot1DCharge: true,
      plot3DFig: true,
      plotWaveform: false,
      plotLogic: false,
      plotPotential: false,
      figSaver: true,
      plotList: false,
      plotspan: 0,
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
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold text-center">SCERPA Configuration Generator</h1>
      
      <Tabs defaultValue="solver" className="w-[800px]">
        <TabsList className="text-muted-foreground inline-flex items-center justify-center rounded-lg p-1 grid w-full grid-cols-3 h-24">
          <TabsTrigger value="solver">Config</TabsTrigger>
          <TabsTrigger value="molecule">Waveform</TabsTrigger>
          <TabsTrigger value="circuit">Circuit</TabsTrigger>
        </TabsList>
        
        {/* Solver Configuration */}
        <TabsContent value="solver">
          <Card>
            <CardHeader>
              <CardTitle>Solver Configuration</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 mtot-1">
                    <div className="flex items-center space-x-2 mtot-1 text-secondary-foreground w-[400px]">
                    <Label htmlFor="solver-type">Circuit Type</Label>
                    <Select 
                        value={config.solver.magcadImporter.toString()} 
                        onValueChange={(value) => updateConfig('solver', 'magcadImporter', parseInt(value))}
                    >
                        <SelectTrigger className='w-auto text-secondary-foreground'>
                        <SelectValue placeholder="Select Solver"/>
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="0">Matlab</SelectItem>
                        <SelectItem value="1">Magcad</SelectItem>
                        </SelectContent>
                    </Select>
                    <Label htmlFor="molecule-name">Molecule Name</Label>
                    <Select 
                          value={config.molecule.name} 
                          onValueChange={(value) => updateConfig('molecule', 'name', value)}
                    >
                        <SelectTrigger className='w-120 text-secondary-foreground'>
                        <SelectValue placeholder="Molecule Name"/>
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="bisfe_4">bisfe_4 (Bisferrocene)</SelectItem>
                        <SelectItem value="ethane">ethane </SelectItem>
                        <SelectItem value="2">... </SelectItem>
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
                    max="3" 
                    className="w-24 text-center text-secondary-foreground"
                  />
                  <Label htmlFor="intermolecular-distance">Intermolecular Distance</Label>
                  <Input 
                    type="number" 
                    value={config.molecule.intermolecularDistance}
                    onChange=
                    {(e) => updateConfig('molecule', 'intermolecularDistance', parseFloat(e.target.value))}
                    className="w-24 text-card-foreground"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Plotting Settings */}
          <Card className="items-center space-x-2 p-1 mt-2 w-[800px]">
            <CardHeader>
              <CardTitle>Plotting Settings</CardTitle>
            </CardHeader>
            <CardContent>

              <div className="grid gap-4 mt-2">
                <div className="flex items-center space-x-2 align-center justify-center ">
                  <Label htmlFor="plot-1d-charge">Plot 1D Charge</Label>
                  <Switch 
                    checked={config.plotting.plot1DCharge}
                    onCheckedChange={(checked) => updateConfig('plotting', 'plot1DCharge', checked)}
                  />
                  <Label htmlFor="plot-3dfig">Plot 3D Fig</Label>
                  <Switch 
                    checked={config.plotting.plot3DFig}
                    onCheckedChange={(checked) => updateConfig('plotting', 'plot3DFig', checked)}
                  />
                  <Label htmlFor="plot-waveform">Plot Waveform</Label>
                  <Switch 
                    checked={config.plotting.plotWaveform}
                    onCheckedChange={(checked) => updateConfig('plotting', 'plotWaveform', checked)}
                  />
                  </div>
                  <div className="flex items-center space-x-2 justify-center">
                  <Label htmlFor="plot-logic">Plot Logic</Label>
                  <Switch 
                    checked={config.plotting.plotLogic}
                    onCheckedChange={(checked) => updateConfig('plotting', 'plotLogic', checked)}
                  />
                  <Label htmlFor="fig_saver">Fig Saver</Label>
                  <Switch 
                    checked={config.plotting.figSaver}
                    onCheckedChange={(checked) => updateConfig('plotting', 'figSaver', checked)}
                  />
                  <Label htmlFor="plot-list">Plot List</Label>
                  <Switch 
                    checked={config.plotting.plotList}
                    onCheckedChange={(checked) => updateConfig('plotting', 'plotList', checked)}
                  />
                  <Label htmlFor="plot-span">Plot Span</Label>
                  <Input 
                    type="number" 
                    value={config.plotting.plotspan}
                    onChange={(e) => updateConfig('plotting', 'plotspan', parseInt(e.target.value))}
                    className="w-24 text-card-foreground"
                    max="3"
                    min="0"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label htmlFor="output-path">Output Path</Label>
                  <Input 
                    id="output-path"
                    value={config.plotting.outputPath}
                    onChange={(e) => updateConfig('plotting', 'outputPath', e.target.value)}
                    placeholder="Enter output path"
                    className="w-48 text-center text-card-foreground"
                  />
                  <Label htmlFor="intermediate-steps">Plot Intermediate Steps</Label>
                  <Input 
                    type="number" 
                    value={config.runtime.plotIntermediateSteps}
                    onChange={(e) => updateConfig('runtime', 'plotIntermediateSteps', parseInt(e.target.value))}
                    className="w-24 text-card-foreground"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  
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
              <div className="grid gap-4 mt-2">
                <div className="flex items-center space-x-2 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 mt-2">
                  <Label htmlFor="molecule-name">Molecule Name</Label>
                  <Input 
                    id="molecule-name"
                    value={config.molecule.name}
                    onChange={(e) => updateConfig('molecule', 'name', e.target.value)}
                    className="w-48 text-center text-card-foreground"
                  />
                </div>
                
                <div className="flex items-center space-x-2 items-center justify-center">
                  <Label htmlFor="intermolecular-distance">Intermolecular Distance</Label>
                  <Input 
                    type="number" 
                    value={config.molecule.intermolecularDistance}
                    onChange=
                    {(e) => updateConfig('molecule', 'intermolecularDistance', parseFloat(e.target.value))}
                    className="w-24 text-card-foreground"
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
              <div className="grid gap-4 mt-2">
                <div className="flex items-center space-x-20 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-1  text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ">
                  {/* <Label>Circuit Structure</Label> */}
                  <div className="grid grid-cols-5 gap-2">
                    {config.circuit.structure.map((value, index) => (
                      <Input 
                        key={index} 
                        type="text" 
                        value={value}
                        onChange={(e) => handleStructureChange(index, e.target.value)}
                        className="w-12 text-center text-card-foreground"
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center align-center space-x-2 text-card-foreground">
                  <Label>Drivers</Label>
                  <div className="flex space-x-2 text-card-foreground">
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
                      className="w-24 text-card-foreground"
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
                      className="w-24 text-card-foreground"
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
                    className="text-card-foreground"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      
      
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