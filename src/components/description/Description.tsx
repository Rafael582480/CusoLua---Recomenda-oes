import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Informations {
    nome: string;
    description: string;
}

export function Description({ nome, description }: Informations) {

    return (
        <div className="border border-gray-500 rounded-lg w-full">
            <div className="flex w-full h-full flex-col gap-5 bg-zinc-900 rounded-lg rounded-b-lg">
            <div className="w-full h-12 p-3 rounded-t-lg text-white bg-zinc-800 flex gap-1 items-center">
                <FontAwesomeIcon icon={faBook} className="text-blue-700 text-lg" />
                <h1 className="font-medium text-base">Descrição</h1>
            </div>
                <div className='p-5'>
                    <h1 className="text-white font-bold text-2xl">{nome}</h1>
                </div>
                <div className="h-full p-5">
                    <p className="text-white font-base text-lg whitespace-pre-line">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}