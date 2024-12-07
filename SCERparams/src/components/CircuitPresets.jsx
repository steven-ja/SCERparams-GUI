// circuitPresets.js
export const circuitPresets = {
    majorityVoter: {
        name: "MajorityVoter",
        structure: [
            ['0', '0', '0', '0', 'Dr1', 'Dr2', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '1', '1', '0', '0', '0', '0'],
            ['Dr3', 'Dr4', '1', '1', '2', '2', '2', '2', '3', '3'],
            ['0', '0', '0', '0', '1', '1', '0', '0', '0', '0'],
            ['0', '0', '0', '0', 'Dr5', 'Dr6', '0', '0', '0', '0']
        ],
        drivers: [
            { name: 'Dr1', value: 4.5, time_units: 3 },
            { name: 'Dr2', value: -4.5, time_units: 3 },
            { name: 'Dr3', value: 4.5, time_units: 3 },
            { name: 'Dr4', value: -4.5, time_units: 3 },
            { name: 'Dr5', value: 4.5, time_units: 3 },
            { name: 'Dr6', value: -4.5, time_units: 3 }
        ],
        stackPhase: [
            [2, 2, 2],    // phase 1
            [-2, 2, 2],   // phase 2
            [-2, -2, 2]   // phase 3
        ]
    }
    // Add more presets here as needed
};
