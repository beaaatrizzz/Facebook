let selectedImage = null; // Variável para armazenar a imagem selecionada

// Função para atualizar a visualização da imagem selecionada
function atualizarimagem() {
    // Obtém o primeiro arquivo da entrada de imagem
   

    const image = document.getElementById('postImage').files[0];
    
    // Se uma imagem foi selecionada, cria uma URL temporária para exibição
    if (image) {
        selectedImage = URL.createObjectURL(image);
    }
}

// Função para criar uma nova postagem
function post() {
    // Obtém o conteúdo do campo de texto e o feed
    const content = document.getElementById('postContent').value;
    const feed = document.getElementById('feed');

    // Verifica se o conteúdo e a imagem estão vazios
    if (!content && !selectedImage) {
        alert("Por favor, insira uma mensagem ou selecione uma imagem."); // Mensagem de alerta
        return; // Impede a postagem se ambos estiverem vazios
    }

    // Cria um novo elemento para a postagem
    const postElement = document.createElement('div');
    postElement.className = 'post'; // Adiciona a classe para estilização

    // Se houver conteúdo, cria um parágrafo para ele
    if (content) {
        const textElement = document.createElement('p');
        textElement.innerText = content; // Define o texto da postagem
        postElement.appendChild(textElement); // Adiciona o texto à postagem
    }

    // Se houver uma imagem selecionada, cria um elemento de imagem
    if (selectedImage) {
        const img = document.createElement('img');
        img.src = selectedImage;
        img.style.maxWidth = '100%';
        postElement.appendChild(img);
        URL.revokeObjectURL(selectedImage); // Libera a URL
        selectedImage = null; // Reseta a imagem selecionada
    }
    

    // Cria um botão de excluir
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button'; // Adiciona a classe para estilização
    deleteButton.innerText = 'Excluir'; // Define o texto do botão
    deleteButton.onclick = function() {
        feed.removeChild(postElement); // Remove a postagem do feed quando o botão é clicado
    };
    postElement.appendChild(deleteButton); // Adiciona o botão à postagem

    // Adiciona a nova postagem no topo do feed
    feed.prepend(postElement);
    // Limpa os campos de entrada após a postagem
    document.getElementById('postContent').value = '';
    document.getElementById('postImage').value = '';
}