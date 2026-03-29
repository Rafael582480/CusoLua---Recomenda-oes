import { NextRequest, NextResponse } from 'next/server';
import {prisma} from "@/src/app/lib/prisma";

export async function GET () {
    try {
        const data = await prisma.code.findMany();

        return NextResponse.json(data);
    } catch(err) {
        console.error('Erro ao buscar desafios:', err);
        return NextResponse.json(
            { error: 'Erro ao carregar desafios' },
            { status: 500 }
        );
    }
}