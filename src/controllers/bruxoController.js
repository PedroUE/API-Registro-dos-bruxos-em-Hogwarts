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

export const criar = async (req, res) => {
  try {
    const { nome, casa, varinha, anoMatricula } = req.body;

    if (!nome || !casa || !varinha || !anoMatricula) {
      return res.status(400).json({ 
        erro: 'Feitiço mal executado - campos obrigatórios faltando',
        camposObrigatorios: ['nome', 'casa', 'varinha', 'anoMatricula']
      });
    }
    
 
    const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
    if (!casasValidas.includes(casa)) {
      return res.status(400).json({
        erro: 'Casa inválida! O Chapéu Seletor só reconhece as 4 casas',
        casasValidas
      });
    }
    
    const novoBruxo = await BruxoModel.create(req.body);
    
    res.status(201).json({
      mensagem: `🎓 ${nome} foi matriculado(a) em ${casa} com sucesso!`,
      bruxo: novoBruxo
    });

  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao matricular bruxo',
      detalhes: error.message 
    });
  }
};

export const deletar = async (req, res) => {
    try{
        const id = parseInt(req.params.id);

        const bruxoExiste = await bruxoModel.encontreUm(id);

        if(!bruxoExiste) {
            return res.status(404).json({
                error: 'Bruxo não econtrado com esse id',
                id: id
            });
        }
        await bruxoModel.deletar(id);

        res.status(200).json({
            mensagem: 'Bruxo deletado com sucesso!',
            bruxoRemovido : bruxoExiste
        })
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao apagar bruxo!',
            detalhes: error.message
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;

        const bruxoExiste = await bruxoModel.encontreUm(id);

        if(!bruxoExiste) {
            return res.status(404).json({
                erro: 'Bruxo não existe',
                id: id
            })
        }
        if (dados.casa) {
        const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
    if (!casasValidas.includes(dados.casa)) {
      return res.status(400).json({
        erro: 'Casa inválida! O Chapéu Seletor só reconhece as 4 casas',
        casasValidas
      });
    }
}
    const bruxoAtualizado = await bruxoModel.atualizar(id, dados)

    res.status(200).json({

    })

    } catch (error) {
        req.status(500).json({
            erro: 'Erro ao atualizar bruxo',
            detalhes: error.message
        })
    }
}