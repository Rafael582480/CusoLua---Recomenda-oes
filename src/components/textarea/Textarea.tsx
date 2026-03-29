import { faCode, faPlay, faRotate, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import Editor from '@monaco-editor/react';

interface Informations {
    codebase: string;
    result?: string;
    handleRun?: () => void;
    setCodebase?: (code: string) => void;
}

export function Textarea({ codebase, result, handleRun, setCodebase }: Informations) {
    const code_not_edit = useRef(codebase);
    function realodCode() {
        setCodebase?.(code_not_edit.current);
    }

    return (
        <div className="flex flex-col rounded-lg w-full">
            <div className='bg-zinc-800 rounded-t-lg p-3 h-12 flex justify-between items-center'>
                <div className='flex gap-1 items-center'>
                    <FontAwesomeIcon icon={faCode} className="text-green-700 text-lg" />
                    <h3 className='text-gray-300 font-medium text-lg'>Lua</h3>
                </div>
                <div className='flex gap-1'>
                    <FontAwesomeIcon onClick={() => handleRun?.()} icon={faPlay} className="text-green-600 cursor-pointer hover:bg-zinc-600 rounded-sm bg-zinc-700 text-lg p-2" />
                    <FontAwesomeIcon onClick={() => realodCode()} icon={faRotate} className="text-yellow-600 cursor-pointer hover:bg-zinc-600 rounded-sm bg-zinc-700 text-lg p-2" />
                </div>
            </div>

            <div className="h-96">
                <Editor
                    height="100%"
                    defaultLanguage="lua"
                    value={codebase}
                    theme="vs-dark"
                    onChange={(value) => setCodebase?.(value || "")}
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        wordWrap: "on"
                    }}
                />
            </div>

            <div className='flex flex-col'>
                <div className='bg-zinc-800 p-2 flex gap-1'>
                    <FontAwesomeIcon icon={faTerminal} className="text-green-600 text-xl" />
                    <h3 className='text-gray-300 font-medium text-base'>Output</h3>
                </div>
                <textarea
                    className={`${result === "CORRECT" ? "text-green-500 text-xl font-bold" : "text-red-500 text-xl font-bold"} w-full h-30 bg-zinc-900 focus:outline-none rounded-b-lg p-4`}
                    placeholder={result}
                    readOnly
                />
            </div>
        </div>
    );
}