import Link from "next/link";

export interface IcardInfos {
    href: string;
    image: string;
    title: string;
    description: string;
};

export function Card({ href, image, title, description }: IcardInfos) {
    return (
        <Link href={href}>
            <article className="p-3 rounded-lg h-90 w-80 border border-gray-900 hover:bg-gray-900">
                <img src={image} alt="Imagem" width={400} height={300} />

                <div className="p-2">
                    <h1 className="text-[var(--text-primary)]">{title}</h1>

                    <p className="text-[var(--text-secundary)]">{description}</p>
                </div>
            </article>
        </Link>
    );
};