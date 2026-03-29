import luainjs from "lua-in-js";

export interface DecompilerResult {
    errors?: string[];
    success: boolean;
    code?: string;
    output?: string;
    returnValue?: string;
    metadata?: {
        originalSize: number;
        compiledSize: number;
    };
};

export class DecompilerModule {
    async compiledCode(code: string): Promise<DecompilerResult> {
        let capturedOutput = '';
        let returnValue = null;
        
        try {
            const luaEnv = luainjs.createEnv({
                stdout: (output: string) => {
                    capturedOutput += output + '\n';
                },
                fileExists: () => false,
                loadFile: () => { throw new Error('File access denied'); },
                osExit: () => { throw new Error('os.exit blocked'); }
            });

            const script = luaEnv.parse(code);
            returnValue = script.exec();
            let finalCode = '';
            if (returnValue !== undefined && returnValue !== null) {
                finalCode = typeof returnValue === 'string' 
                    ? returnValue 
                    : JSON.stringify(returnValue, null, 2);
            };
            
            if (!finalCode && capturedOutput) {
                finalCode = capturedOutput.trim();
            };

            return {
                success: true,
                code: finalCode || 'Executado com sucesso',
                output: capturedOutput.trim(),
                returnValue: String(returnValue),
                metadata: {
                    originalSize: code.length,
                    compiledSize: finalCode.length || capturedOutput.length
                }
            };

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido na compilação';
            
            return {
                success: false,
                errors: [errorMessage],
                output: capturedOutput.trim(),
                metadata: {
                    originalSize: code?.length || 0,
                    compiledSize: 0
                }
            };
        }
    }
};