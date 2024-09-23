document.addEventListener('DOMContentLoaded', function() {
    const estoqueList = document.getElementById('estoque-list');
    const formProduto = document.getElementById('form-produto');

    function carregarEstoque() {
        fetch('http://localhost:8080/api/estoque')
            .then(response => response.json())
            .then(data => {
                estoqueList.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.nome} - ${item.quantidade} unidades - R$${item.preco.toFixed(2)}`;
                    estoqueList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar o estoque:', error);
            });
    }

    formProduto.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const quantidade = document.getElementById('quantidade').value;
        const preco = document.getElementById('preco').value;

        if (!nome || isNaN(quantidade) || isNaN(preco)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const novoProduto = {
            nome: nome,
            quantidade: parseInt(quantidade),
            preco: parseFloat(preco)
        };

        fetch('http://localhost:8080/api/estoque', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoProduto),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Produto adicionado:', data);
            carregarEstoque();
            formProduto.reset(); // Limpa os campos do formulário
        })
        .catch(error => {
            console.error('Erro ao adicionar o produto:', error);
            alert('Erro ao adicionar o produto. Tente novamente.');
        });
    });

    carregarEstoque();
});
