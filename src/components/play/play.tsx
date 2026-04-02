"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export interface Video {
    index: number,
    title: string,
};


export function Play({ title }: Video) {
    return (
        <div className="cursor-pointer h-20 w-full text-[var(--text-secundary)] font-medium flex gap-4 items-center">
            <FontAwesomeIcon className="text-[#00E002]" icon={faPlay} />
            <h2 className="text-sm">{title}</h2>
        </div>
    );
}
