import * as bruxoModel from "./../models/bruxoModel.js";

export const listarTodos = async (req, res) => {
    try {
        const bruxos = await bruxoModel.encontreTodos();
        
        if (!bruxos || bruxos.length === 0) {
            return res.status(404).json({
                total: 0,
                mensagem: "Nenhum bruxo encontrado",
                bruxos
            });
        }

        res.status(200).json({
            mensagem: "Lista de bruxos",
            total: bruxos.length,
            bruxos
        });
    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao listar bruxos",
            erro: error.message
        });
    }
}


export const listarUm = async (req, res) => {
    try {
        const id = req.params.id;
        const bruxo = await bruxoModel.encontreUm(id);

        if (!bruxo) {
            return res.status(404).json({
                mensagem: `Bruxo com id ${id} não encontrado`,
                id: id
            });
        }
        res.status(200).json({
            mensagem: "Bruxo encontrado",
            bruxo
        });
        
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar bruxo",
            erro: 'erro no Server',
            status: 500
        });
    }
};