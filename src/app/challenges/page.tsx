 "use client";

import { OrganizationCard } from "@/components/organChallenges/organ";
import { useEffect, useState } from "react";

interface IChallenge {
  id: string;
  nome: string;
  description: string;
}

export default function ChallengesPage() {
    const [challenges, setChallenges] = useState<IChallenge[]>([]);

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
            console.log('Desafios carregados:', data);
        } catch (err) {
            console.error('Erro:', err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl text-white  font-bold mb-4">
                    Desafios para você testar seu conhecimento!
                </h1>
                <p className="text-gray-600  text-white text-lg">
                    Escolha um desafio e escreva seu código Lua para testar sua solução
                </p>
            </div>

            <div className="flex justify-center">
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
