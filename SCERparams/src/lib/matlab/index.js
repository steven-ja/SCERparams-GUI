// src/lib/matlab/index.js
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { save } from '@tauri-apps/plugin-dialog';
import { generateMatlabFile } from './generateMatlabFile';

export const saveMatlabFile = async (config, filePath) => {
    try {
        const matlabCode = generateMatlabFile(config);
        await writeTextFile(filePath, matlabCode);
        return true;
    } catch (error) {
        console.error('Error saving MATLAB file:', error);
        throw error;
    }
};

export const saveWithDialog = async (config) => {
    try {
        const filePath = await save({
            filters: [{
                name: 'MATLAB',
                extensions: ['m']
            }]
        });
        
        if (filePath) {
            await saveMatlabFile(config, filePath);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Failed to save configuration:', error);
        throw error;
    }
};

export { generateMatlabFile };
