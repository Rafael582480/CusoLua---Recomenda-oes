"use client";

import { OrganizationCard } from "@/components/organChallenges/organ";
import { useEffect, useState } from "react";
import gifLoad from "@/assets/image/Loading animation blue.gif";

interface IChallenge {
    id: string;
    nome: string;
    description: string;
}

export default function ChallengesPage() {
    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        try {
            const response = await fetch('/api/listchallenges');
            if (!response.ok) {
                throw new Error('Erro ao carregar desafios');
            }
            const data = await response.json();
            setChallenges(data);
            setLoading(false);
        } catch (err) {
            console.error('Erro:', err);
        }
    };

    return (
        <div className="w-full md:w-1/2 m-auto px-4 py-8">
            <div className="mb-12 mt-12">
                <h1 className="text-4xl md:text-5xl font-mono text-[var(--text-primary)]  font-bold mb-4">
                    Desafios <span className="text-[#00E022]">Disponiveis!</span>
                </h1>
            </div>
            <div className={`${loading === true ? "block" : "hidden"} flex justify-center`}>
                <img src={gifLoad.src} alt="carregando..." />
            </div>
            <div className={`${loading === true ? "hidden" : "block"}flex justify-center`}>
                <OrganizationCard
                    desafios={
                        challenges.map((item, index) => ({
                            id: item.id,
                            nome: item.nome,
                            index: index + 1,
                            descricao: item.description,
                        }))
                    }
                />
            </div>
        </div>
    );
} 