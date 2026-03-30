// app/api/getcode/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DecompilerModule } from '../../../modules/decompilerCode_Modulo';
import { VerifyModulo } from '../../../modules/verifyCode_Modulo';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validação do ID
    if (!id || Array.isArray(id)) {
      return NextResponse.json(
        {
          error: "ID inválido",
          message: "ID deve ser uma string válida"
        },
        { status: 400 }
      );
    }

    // Extrai o body da requisição
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        {
          error: "Código não fornecido",
          message: "O campo 'code' é obrigatório"
        },
        { status: 400 }
      );
    }

    // Executa a lógica de negócio (igual ao seu código original)
    const decompiler = new DecompilerModule();
    const code_formated = await decompiler.compiledCode(code);

    // Verifica se a compilação foi bem sucedida
    if (!code_formated.success) {
      return NextResponse.json(
        {
          error: "Erro na compilação",
          message: code_formated.errors,
          details: code_formated
        },
        { status: 400 }
      );
    }

    const verify = new VerifyModulo();
    const result_verify = await verify.verifyCode(
      code_formated.returnValue || '',
      id
    );

    // Retorna o resultado
    return NextResponse.json({
      ...result_verify,
      compiledCode: code_formated.code,
      output: code_formated.output,
      metadata: code_formated.metadata
    });

  } catch (err) {
    console.error('Erro no endpoint /api/getcode:', err);
    
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Algo não está certo!",
        message: "Erro interno do servidor"
      },
      { status: 500 }
    );
  }
}