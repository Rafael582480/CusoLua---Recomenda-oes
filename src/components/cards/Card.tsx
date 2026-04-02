"use client";
import Link from "next/link";
import { useState } from "react";

export interface IcardInfos {
    href: string;
    image: string;
    title: string;
    description: string;
};

export function Card({ href, image, title, description }: IcardInfos) {
    const [active, setActive] = useState(false);

    return (
        <Link href={href}>
            <article onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}  className="hover:scale-101 transition duration-300 flex flex-col p-3 items-center gap-2 hover:bg-[#0D0D0D]  bg-[#0A0A0A] rounded-lg h-100 w-90 md:w-70 lg:w-80">
                <img src={image} alt="Imagem" width={400} height={300} />

                <div className="p-2 h-1/3">
                    <h1 className="text-white font-bold text-lg">{title}</h1>

                    <p className="text-[var(--text-secundary)]">{description}</p>
                </div>
                <div className={`${active === true ?  "bg-[#00B002] border-none" : null} flex mb-7 transition duration-300  p-3 border border-white rounded-lg`}>
                    <Link href={href} className="text-center text-white">Começar Recomendação</Link>
                </div>
            </article>
        </Link>
    );
};