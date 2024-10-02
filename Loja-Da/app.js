const localhost = "http://localhost:8080";

document.getElementById('produto-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const sku = document.getElementById('sku').value;
    const nome = document.getElementById('nome').value;

    const produto = {
        SKU: sku,
        nome: nome
    };

    fetch(`${localhost}/produto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao cadastrar o produto');
            }
        })
        .then(data => {
            document.getElementById('mensagem').textContent = 'Produto cadastrado com sucesso!';
            console.log('Produto cadastrado:', data);
        })
        .catch(error => {
            document.getElementById('mensagem').textContent = 'Erro ao cadastrar o produto.';
            console.error('Erro:', error);
        });
});

function carregarProdutos() {
    fetch(`${localhost}/produto`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os produtos');
            }
            return response.json();
        })
        .then(produtos => {
            console.log(produtos);
            const produtosList = document.getElementById('produtos-list');
            produtosList.innerHTML = '';
            produtos.forEach(produto => {
                const listItem = document.createElement('li');
                listItem.textContent = `SKU: ${produto.SKU}, Nome: ${produto.nome}`;
                produtosList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

document.getElementById('atualizar-produto-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const sku = document.getElementById('atualizar-sku').value;
    const nome = document.getElementById('atualizar-nome').value;

    const produtoAtualizado = {
        nome: nome
    };

    fetch(`${localhost}/produto/${sku}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao atualizar o produto');
            }
        })
        .then(data => {
            document.getElementById('mensagem-atualizacao').textContent = 'Produto atualizado com sucesso!';
            console.log('Produto atualizado:', data);
        })
        .catch(error => {
            document.getElementById('mensagem-atualizacao').textContent = 'Erro ao atualizar o produto.';
            console.error('Erro:', error);
        });
});

document.getElementById('excluir-produto-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const sku = document.getElementById('excluir-sku').value;

    fetch(`${localhost}/produto/${sku}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Erro ao excluir o produto');
            }
        })
        .then(data => {
            document.getElementById('mensagem-exclusao').textContent = data || 'Produto excluído com sucesso!';
            console.log('Produto excluído:', data);
        })
        .catch(error => {
            document.getElementById('mensagem-exclusao').textContent = 'Erro ao excluir o produto.';
            console.error('Erro:', error);
        });
});