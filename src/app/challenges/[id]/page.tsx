import { prisma } from '@/app/lib/prisma';
import ChallengeSelectClient from './ChallengeSelectClient';
import { notFound } from 'next/navigation';

interface Challenge {
  id: string;
  nome: string;
  description: string;
  codebase?: string;
}

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let challenge: any = null; // TODO: define full type later

  try {
    const { id } = await params;
    
    if (!id || Array.isArray(id)) {
      throw new Error('ID inválido');
    }

    challenge = await prisma.code.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        description: true,
        result: true, // para debug, mas não exposto
        code_base: true,
      }
    });

    if (!challenge) {
      notFound();
    }

    // Mapear para interface do client
    challenge = {
      id: challenge.id,
      nome: challenge.nome,
      description: challenge.description,
      codebase: challenge.code_base,
    };

  } catch (error) {
    console.error('Erro ao carregar desafio:', error);
    notFound();
  }

  return (
    <div>
      <ChallengeSelectClient 
        id={challenge!.id} 
        initialChallenge={challenge!} 
      />
    </div>
  );
}
