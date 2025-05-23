// src/lib/matlab/generateMatlabFile.js

// const formatStructureMatrix = (structure) => {
//     return structure.map(row => 
//         row.map(cell => typeof cell === 'string' ? `'${cell}'` : cell).join('     ')
//     ).join(';\n                     ');
// };

// const formatStructureMatrix = (structure) => {
//     return structure.map(row => {
//         // Format each cell and track max length
//         const formattedCells = row.map(cell => 
//             typeof cell === 'string' ? `'${cell}'` : cell.toString()
//         );
//         const maxLength = Math.max(...formattedCells.map(cell => cell.length));
        
//         // Join cells with dynamic padding
//         return formattedCells.map((cell, i) => {
//             const padding = ' '.repeat(maxLength - cell.length + 2); // minimum 2 spaces
//             return i < row.length - 1 ? cell + padding : cell; // no padding for last cell
//         }).join('');
//     }).join(';\n                     ');
// };

const formatStructureMatrix = (structure) => {
    // First find the maximum length for each column
    const columnWidths = structure[0].map((_, colIndex) => {
        return Math.max(...structure.map(row => {
            const cell = row[colIndex];
            const formattedCell = typeof cell === 'string' ? `'${cell}'` : cell;
            return formattedCell.toString().length;
        }));
    });

    // Format the matrix with consistent column widths
    return structure.map(row => 
        row.map((cell, colIndex) => {
            const formattedCell = typeof cell === 'string' ? `'${cell}'` : cell;
            const padding = ' '.repeat(columnWidths[colIndex] - formattedCell.toString().length + 2);
            return colIndex < row.length - 1 ? formattedCell + padding : formattedCell;
        }).join('')
    ).join(';\n                     ');
};



// const formatDrivers = (drivers) => {
//     return drivers.map(driver => 
//         `    '${driver.name}'   ${Array(3).fill(driver.value).join(' ')}`
//     ).join('\n');

// const formatDrivers = (drivers) => {
//     return drivers.map(driver => 
//         `    '${driver.name}'   ${driver.value >= 0 ? '+' : '-'}${Math.abs(driver.value)} ${driver.value >= 0 ? '+' : '-'}${Math.abs(driver.value)} ${driver.value >= 0 ? '+' : '-'}${Math.abs(driver.value)}`
//     ).join('\n');
// };

const formatDrivers = (drivers, stackPhaseLength) => {
    return drivers.map(driver => {
        const valueString = Array(stackPhaseLength)
            .fill(`${driver.value >= 0 ? '+' : '-'}${Math.abs(driver.value)}`)
            .join(' ');
        return `    '${driver.name}'   ${valueString}`;
    }).join('\n');
};

// const formatStackPhases = (phases) => {
//     return phases.map((phase, index) => 
//         `circuit.stack_phase(${index + 1},:) = [${phase.join(' ')}];`
//     ).join('\n');
// };

const formatStackPhases = (phases) => {
    return phases.map((phase, index) => {
        const formattedPhase = phase.map(value => 
            `${value >= 0 ? '+' : '-'}${Math.abs(value)}`
        );
        return `circuit.stack_phase(${index + 1},:) = [${formattedPhase.join(' ')}];`;
    }).join('\n');
};


export const generateMatlabFile = (config) => {
    const matlabCode = `clear all
close all

% solver
circuit.magcadImporter = ${config.solver.magcadImporter}; % 0 Matlab, 1 Magcad 

%molecule
circuit.molecule = '${config.molecule.name}';

%Intermolecular distance
circuit.dist_z = ${config.molecule.intermolecularDistance};

%layout (Layout Generator)
circuit.structure = {${formatStructureMatrix(config.circuit.structure)}
};
 
%drivers
circuit.Values_Dr = {
${formatDrivers(config.circuit.drivers, config.circuit.stackPhase.length)}
};

%clock
${formatStackPhases(config.circuit.stackPhase)}

%RunTime Plot
settings.plotIntermediateSteps = ${config.runtime.plotIntermediateSteps};
settings.verbosity = ${config.runtime.verbosity};

%Convergence settings
settings.damping = ${config.runtime.damping};

%Viewer settings
plotSettings.plot_waveform = ${config.plotting.plotWaveform ? 1 : 0};
plotSettings.plot_3dfig = ${config.plotting.plot3DFig ? 1 : 0};
plotSettings.plot_1DCharge = ${config.plotting.plot1DCharge ? 1 : 0};
plotSettings.plot_logic = ${config.plotting.plotLogic ? 1 : 0};
plotSettings.plot_potential = ${config.plotting.plotPotential ? 1 : 0};
plotSettings.fig_saver = ${config.plotting.figSaver ? 1 : 0};
plotSettings.plotList = ${config.plotting.plotList ? 1 : 0};

%paths
settings.out_path = pwd;
plotSettings.out_path = settings.out_path;

%%%%
this_path = pwd;
scerpa_path = 'scerpa';
cd(scerpa_path)
generation_status = SCERPA('generateLaunch', circuit, settings);
                    SCERPA('plotSteps', plotSettings);
cd(this_path)`;

    return matlabCode;
};
