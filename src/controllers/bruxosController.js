import dados from "../models/dados.js";

const {bruxos} = dados;
let resultado = bruxos;     

const getAllBruxos = (req, res) => {
    res.status(200).json ({
        message: `Lista de bruxos convocada com sucesso!`,
        total: resultado.length,
        bruxos: resultado
    });
} 

const getBruxosById = (req, res) => {
    let id = parseInt(req.params.id);
    

    const bruxo = bruxos.find(b => b.id === id);

    if(bruxo) {
        res.status(404).json({
            sucess: false,
            message: `Nenhum bruxo foi encontrado no Beco Diagonal!`
        });
    }

    res.status(200).json ({
        message: `O bruxo com o id: ${id} foi encontrado com sucesso!`,
        total: bruxo.length,
        bruxo: bruxo
    });
}

const createBruxo = (req, res) => {
    const {nome, casa, ano, varinha, mascote, patrono, especialidade} = req.body;

    if (!nome || !casa || !varinha || !mascote || !patrono || !especialidade) {
        return res.status(400).json ({
            sucess: false,
            menssage: `Feitiço mal executado! Verifique os ingredientes`
        });
    }

    const novoBruxo = {
        id: bruxos.length +1,
        nome: nome, 
        casa: casa,
        varinha: varinha,
        mascote: mascote,
        patrono: patrono,
        especialidade: especialidade
    }

    bruxos.push(novoBruxo);
    res.status(201).json({
        sucess: true,
        menssage: "Novo bruxo matriculado em Hogwarts!",
        bruxo: novoBruxo
    });
}

const deleteBruxo = (req, res) => {
    const id = parseInt(req.params.id);

    console.log(id)
    
    if(isNaN(id)) {
        return res.status(400).json({
            sucess: false,
            message: "O ID deve ser válido"
        });
    }

    const bruxosParaRemover = bruxos.find(b => b.id === id);

    if (!bruxosParaRemover) {
        return res.status(404).json({
            sucess: false,
            message: `Bruxo com o id: ${id} não existe!`
        });
    }


    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== id);
    
    bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

    res.status(200).json ({
        sucess: true,
        message: `Bruxo expulso de Hogwarts com sucesso!`
    });
}

const updateBruxos = (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, casa, ano, varinha, mascote, patrono, especialidade} = req.body;
    const idParaEditar = id;

    if(isNaN(idParaEditar)) {
        return res.status(400).json({
            sucess: false,
            message: `O id deve ser um numero válido`
        });
    }

    if(!nome || !casa || !varinha || !mascote || !patrono || !especialidade) {
        return res.status(400).json({
            success: false,
            message: `Os itens acima são necessários para atualizar um bruxo!`
        });
    }

    if(casa) {
        if(!casa.include(casa.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `A casa deve ser uma das seguintes: ${casa.join(",")}`
            })
        }
    }

    const bruxoExistente = bruxos.find(bruxo => bruxo.id === id);

    if (!bruxoExistente) {
        return res.status(404).json({
            sucess: false,
            message: `Não é possível reparar o que não existe!`
        });
    }
    
    const bruxoAtualizado = bruxos.map(bruxo => bruxo.id === idParaEditar ? {
        ...bruxo,
        ...(nome && {nome}),
        ...(casa && {casa}),
        ...(varinha && {varinha}),
        ...(mascote && {mascote}),
        ...(patrono && {patrono}),
        ...(especialidade && {especialidade})
        
    }
        :bruxo
    );

    bruxos.slice(0, bruxos.length, ...bruxoAtualizado);

    const bruxoEditado = bruxos.find (bruxo => bruxo.id === idParaEditar);

    res.status(200).json({
        sucess: true,
        message: `Bruxo atualizado com sucesso!`,
        bruxo: bruxoEditado
    });
}

export {getAllBruxos, getBruxosById, createBruxo, deleteBruxo, updateBruxos};