"use client";

import Link from "next/link";

export interface Video {
    index: number,
    title: string,
};


export function Play({ index, title }: Video) {
    return (
        <div className="cursor-pointer border-b-2 border-[var(--color-shadow)] hover:bg-zinc-900 h-20 w-full text-[var(--text-secundary)] p-3 font-medium flex gap-4 items-center">
            <i className="fa-solid fa-play"></i>
            <h2 className="text-sm">{title}</h2>
        </div>
    );
}
