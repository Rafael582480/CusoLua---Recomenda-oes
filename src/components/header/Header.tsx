"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const currentPath = usePathname();

    return (
        <header className="flex fixed top-0 right-0 left-0 z-50 justify-center items-center p-5 gap-9 bg-zinc-900">
            <Link href="/"><h1 className="font-bold text-2xl text-[var(--text-primary)] rounded-lg">CODAR<span className="text-[var(--color-primary)]">LUA</span></h1></Link>
            <nav>
                <ul className="flex gap-4 text-base">
                    <div className="data-[active=true]:shadow-[0px_1px_0px_#ffffff]" data-active={currentPath === "/"}>
                        <Link href='/'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secundary)]">Cursos</li></Link>
                    </div>
                    <div className="data-[active=true]:shadow-[0px_1px_0px_#ffffff]" data-active={currentPath === "/desafios"}>
                        <Link href='/desafios'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secundary)]">Desafios</li></Link>
                    </div>
                    <div className="data-[active=true]:shadow-[0px_1px_0px_#ffffff]" data-active={currentPath === "/projetos"}>
                        <Link href='/projetos'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secundary)]">Projetos</li></Link>
                    </div>
                </ul>
            </nav>
        </header>
    );
}