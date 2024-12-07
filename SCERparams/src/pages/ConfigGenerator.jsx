import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import custom components
import { Chart } from './../components/ui/CircuitChart';
import CircuitStructureTable from '../components/ui/CircuitStructureTable';





const SCERPAConfigGenerator = () => {
  // constant to move to other files
  // Define clock parameters
  const clockLow = -2;
  const clockHigh = 2;
  const clockStep = 3;

  // Generate elementary vectors
  const linspace = (start, end, n) =>
  Array.from({ length: n }, (_, i) => start + (i * (end - start)) / (n - 1));

  const pSwitch = linspace(clockLow, clockHigh, clockStep);
  const pHold = Array(clockStep).fill(clockHigh);
  const pRelease = linspace(clockHigh, clockLow, clockStep);
  const pReset = Array(clockStep).fill(clockLow);

  // Create pCycle
  const pCycle = [...pSwitch, ...pHold, ...pRelease, ...pReset];

  // Generate stack phases
  const stackPhase = [
  [...pCycle, ...pCycle, ...pReset, ...pReset], // stack_phase(1,:)
  [...pReset, ...pCycle, ...pCycle, ...pReset], // stack_phase(2,:)
  [...pReset, ...pReset, ...pCycle, ...pCycle], // stack_phase(3,:)
  ];

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
      structure: Array(7).fill().map(() => Array(4).fill('0')), // 7x4 matrix      
      drivers: [
        { name: 'Dr1', value: 4.5, time_units: 1 },
        { name: 'Dr2', value: -4.5, time_units: 1 },
        { name: 'Dr3', value: 4.5, time_units: 1 },
        { name: 'Dr4', value: -4.5, time_units: 1 }, 
        { name: 'Dr5', value: 4.5, time_units: 1 },
        { name: 'Dr6', value: -4.5, time_units: 1 },
      ],
      stackPhase: [2],
    },
    runtime: {
      plotIntermediateSteps: -1,
      verbosity: 2,
      damping: 0.6,
    },
    // %PLOT settings
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

  // const [dimensions, setDimensions] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight
  // });

  // useEffect(() => {
  //   const handleResize = () => {
  //     setDimensions({
  //       width: window.innerWidth,
  //       height: window.innerHeight
  //     });
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

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
  // const handleStructureChange = (newStructure) => {
  //   setConfig(prev => ({
  //     ...prev,
  //     circuit: { ...prev.circuit, structure: newStructure.flat() } // flatten the 2D array if needed
  //   }));
  // };

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
    <div className="container mx-auto justify-center">
      <h1 className="text-2xl font-bold text-center">SCERPA Configuration Generator</h1>
      
      <Tabs defaultValue="solver" className="w-[800px] hover:border py-1">
        <TabsList className="text-muted-foreground inline-flex items-center justify-center rounded-lg p-1 grid w-full grid-cols-3 h-24 hover:border">
          <TabsTrigger value="solver">Config</TabsTrigger>
          <TabsTrigger value="waveform">Waveform</TabsTrigger>
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
                        <SelectItem value="butane">butane </SelectItem>
                        <SelectItem value="decatriene">decatriene </SelectItem>
                        </SelectContent> 
                    </Select>
                    <Label htmlFor="damping">Damping</Label>
                    <Input 
                      type="number" 
                      value={config.runtime.damping}
                      onChange={(e) => updateConfig('runtime', 'damping', parseFloat(e.target.value))}
                      min="0" 
                      max="1"
                      step="0.1" 
                      className="w-24 text-center text-secondary-foreground"
                    />
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
                  <Label htmlFor="intermolecular-distance">Intermolecular Distance [nm] </Label>
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
                
                <div className="flex items-center space-x-2 justify-center">
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
        
        {/* Waveform Configuration */}
        <TabsContent value="waveform">
            <Chart />
        </TabsContent>
        
        {/* Circuit Configuration */}
        <TabsContent value="circuit">
          <Card>
            <CardHeader>
              <CardTitle>MATLAB Circuit Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mt-2">

                <div className="flex flex-col items-center space-y-4">
                  <CircuitStructureTable 
                    initialStructure={config.circuit.structure}
                    onChange={handleStructureChange}
                  />
                </div>
             
                <div className="flex items-center align-center space-x-2 text-card-foreground justify-center">
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
                    <Label className="w-[100px]"># Phases</Label>
                    <Input 
                    type="number" 
                    value={config.stackPhase[0]}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      stackPhase: [parseFloat(e.target.value)]
                    }))}
                    max="4"
                    min="0"
                    step="1"
                    className="text-card-foreground"
                  />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  
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