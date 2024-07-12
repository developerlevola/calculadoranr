const validadeProdutos = {
    "Filé Fresco ATM": 23,
    "Filé Fresco ATM P/ GPA": 14,
    "Filé Fresco á Granel": 15,
    "Filé Fresco Embalado Individual": 15,
    "Filé Ao Forno": 24,
    "Truta Eviscerada fresca BRANCA": 13,
    "Truta Eviscerada fresca ROSA": 14,
    "CMS de peixe": 90,  // 3 meses
    "CMS defumado de peixe": 180,  // 6 meses
    "Hambúrguer": 180,  // 6 meses
    "Filé Defumado": 365,  // 12 meses
    "Filé Congelado": 365,  // 12 meses
    "Truta Eviscerada Congelada": 365  // 12 meses
};

function popularMenuProdutos() {
    const selectProduto = document.getElementById('produto');
    for (const produto in validadeProdutos) {
        const option = document.createElement('option');
        option.value = produto;
        option.text = produto;
        selectProduto.appendChild(option);
    }
}

function calcularValidade() {
    const produto = document.getElementById('produto').value;
    const dataFabricacaoStr = document.getElementById('data-fabricacao').value;

    if (!produto) {
        document.getElementById('resultado-validade').innerText = "Por favor, selecione um produto";
        return;
    }

    const diasValidade = validadeProdutos[produto];
    const partesData = dataFabricacaoStr.split('/');
    if (partesData.length !== 3) {
        document.getElementById('resultado-validade').innerText = "Formato de data inválido. Por favor, use dd/mm/aaaa.";
        return;
    }

    const dataFabricacao = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    const dataValidade = new Date(dataFabricacao);
    dataValidade.setDate(dataValidade.getDate() + diasValidade);

    const dia = String(dataValidade.getDate()).padStart(2, '0');
    const mes = String(dataValidade.getMonth() + 1).padStart(2, '0');
    const ano = dataValidade.getFullYear();
    const dataValidadeStr = `${dia}/${mes}/${ano}`;

    document.getElementById('resultado-validade').innerText = `A data de validade para ${produto} fabricado em ${dataFabricacaoStr} é ${dataValidadeStr}`;
}

function mostrarCalculadora(tipo) {
    const calculadoras = document.querySelectorAll('.calculadora');
    calculadoras.forEach(calculadora => calculadora.style.display = 'none');

    if (tipo === 'validade') {
        document.getElementById('calculadora-validade').style.display = 'block';
    } else if (tipo === 'etiqueta') {
        document.getElementById('calculadora-etiqueta').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    popularMenuProdutos();
});
