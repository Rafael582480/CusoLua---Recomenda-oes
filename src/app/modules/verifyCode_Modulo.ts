import { prisma } from '@/app/lib/prisma';

export interface VerifyResult {
    sucess: boolean;
    errors: string[];
    result: string;
    codebase: string;
    message: string;
};

export class VerifyModulo {
    async verifyCode(value: string, id: string): Promise<VerifyResult> {
        try {
            const challenge = await prisma.code.findUnique({
                where: { id }
            });

            if (!challenge) {
                return {
                    sucess: false,
                    errors: [`Desafio com ID ${id} não encontrado`],
                    result: "NOT_FOUND",
                    codebase: "",
                    message: "Desafio não encontrado"
                };
            }

            const isCorrect = String(value) === String(challenge.result);

            return {
                sucess: isCorrect,
                errors: [],
                result: isCorrect ? "CORRECT" : "INCORRECT",
                codebase: "",
                message: isCorrect 
                    ? "Parabéns! Código correto!" 
                    : `Tente novamente. Saída esperada não corresponde.`
            };
        } catch (error) {
            return {
                sucess: false,
                errors: [`Erro no banco: ${error instanceof Error ? error.message : 'Erro desconhecido'}`],
                result: "ERROR",
                codebase: "",
                message: "Erro ao verificar código"
            };
        }
    }
};
