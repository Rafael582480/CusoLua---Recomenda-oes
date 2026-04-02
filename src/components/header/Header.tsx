"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { faBars, faX, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

export function Header() {
    const currentPath = usePathname();
    const [menu, setMenu] = useState(Boolean);
    const [theme, setTheme] = useState(true);

    function isActive() {
        setMenu(!menu);
    }

    function handleTheme() {
        const html = document.querySelector("html");
        if (html?.getAttribute("data-theme") === "dark") {
            html.setAttribute("data-theme", "light");
            setTheme(false);
        } else {
            html?.setAttribute("data-theme", "dark");
            setTheme(true);
        }
    }

    return (
        <>
            <header className="flex fixed top-0 right-0 left-0 z-50 justify-around md:justify-evenly  items-center p-5 bg-[#0D0D0D]">
                <Link href="/"><h1 className="font-bold text-4xl text-[var(--text-primary)] rounded-lg">CODE<span className="text-[#00E002]">LUA</span></h1></Link>
                <div className="hidden md:block border-3 border-[#00E002] pl-10 p-3 rounded-3xl w-100">
                    <nav className="flex justify-between">
                        <ul className="flex gap-4 text-base">
                            <div className="data-[active=true]:shadow-[0px_2px_0px_#00E002]" data-active={currentPath === "/"}>
                                <Link href='/'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secundary)]">Cursos</li></Link>
                            </div>
                            <div className="data-[active=true]:shadow-[0px_2px_0px_#00E002]" data-active={currentPath === "/challenges"}>
                                <Link href='/challenges'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secundary)]">Desafios</li></Link>
                            </div>
                            <div className="data-[active=true]:shadow-[0px_2px_0px_#00E002]" data-active={currentPath === "/projetos"}>
                                <Link href='/projetos'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secundary)]">Projetos</li></Link>
                            </div>
                        </ul>
                        <div className="pr-5">
                            <FontAwesomeIcon onClick={() => handleTheme()} icon={theme === true ? faMoon : faSun} className="hover:text-[#00E002] transtion duration-500 text-white text-lg cursor-pointer" />
                        </div>
                    </nav>
                </div>
                <div className="block md:hidden">
                    <FontAwesomeIcon onClick={() => isActive()} icon={faBars} className="text-[#00E002] text-xl" />
                </div>
            </header>
            {menu === true ? (
                <div className="flex">
                    <div className="w-2/3 h-screen top-0 z-9999 fixed bg-zinc-900">
                        <div>
                            <Link href="/"><h1 className="p-5 font-bold text-2xl text-[var(--text-primary)] rounded-lg">CODAR<span className="text-[var(--color-primary)]">LUA</span></h1></Link>
                        </div>
                        <nav className="block">
                            <ul className="flex flex-col p-5 gap-4 text-base">
                                <div className="data-[active=true]:shadow-[0px_1px_0px_#ffffff]" data-active={currentPath === "/"}>
                                    <Link href='/'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secundary)]">Cursos</li></Link>
                                </div>
                                <div className="data-[active=true]:shadow-[0px_1px_0px_#ffffff]" data-active={currentPath === "/challenges"}>
                                    <Link href='/challenges'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secundary)]">Desafios</li></Link>
                                </div>
                                <div className="data-[active=true]:shadow-[0px_1px_0px_#ffffff]" data-active={currentPath === "/projetos"}>
                                    <Link href='/projetos'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secundary)]">Projetos</li></Link>
                                </div>
                            </ul>
                        </nav>
                    </div>
                    <div className="h-screen fixed w-1/3 z-9999 right-0 backdrop-blur-sm bg-[var(--color-blue)]">
                        <div onClick={() => isActive()} className="fixed right-10 bg-zinc-800 p-2 rounded-full top-6 w-10 text-center z-9999">
                            <FontAwesomeIcon icon={faX} className="text-white text-xs" />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}