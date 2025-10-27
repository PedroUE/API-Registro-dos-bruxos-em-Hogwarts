import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const encontreTodos = async () => {
    return await prisma.bruxo.findMany({
        orderBy : { name: 'asc' }
    });
}

export const encontreUm = async (id) => {
      return await prisma.bruxo.findUnique({
          where: { id: Number(id) }
      });
}

export const criar = async (dado) => {
    return await prisma.bruxo.create({
        data: {
            nome: dado.nome,
            casa: dado.casa,
            varinha: dado.varinha,
            anoMatricula: dado.anoMatricula
        }
    })
}

export const deletar = async (id) => {
    return await prisma.bruxo.delete({
        where: { id: Number(id) }
    })
}

export const atualizar = async (id, dado) => {
    return await Prisma.bruxo.update({
        where: { id: Number(id) },
        data: {
        ...(dado.nome && { nome: dado.nome }),
        ...(dado.casa && { casa: dado.casa }),
        ...(dado.patrono && { patrono: dado.patrono }),
        ...(dado.varinha && { varinha: dado.varinha }),
        ...(dado.anoMatricula && { anoMatricula: dado.anoMatricula }),
        ...(dado.ativo && { ativo: dado.ativo }),
        }
    })
}