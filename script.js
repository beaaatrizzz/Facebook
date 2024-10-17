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

    //Barra de reações
    const reações = document.createElement('div');
    reações.className = 'reações';
    reações.innerHTML = `
     <span class= "reaction like" data-reaction="Curtir">&#128077</span>
     <span class= "reaction love" data-reaction="Amei">&#128420</span>
     <span class= "reaction haha" data-reaction="Haha">&#128513</span>
     <span class= "reaction wow" data-reaction="Uau">&#128558</span>
     <span class= "reaction sad" data-reaction="Triste">&#128546</span>
     <span class= "reaction angry" data-reaction="Grr">&#128548</span>
    `;
    postElement.appendChild(reações); // adc barra

    //adc espaço para exibir a reação
    const selectedReaction = document.createElement('div');
    selectedReaction.className = 'selected-reaction';
    selectedReaction.innerText = 'Selecione uma reação!';
    postElement.appendChild(selectedReaction);

    //adc funcionalidade
    const reactions = reações.querySelectorAll('.reaction');
    reactions.forEach(reaction => {
        reaction.addEventListener('click', function(){
        reactions.forEach(r => r.classList.remove('Selected'));//remove
        this.classList.add('selected');//destaca
        const reactionName = this.getAttribute('data-reaction');
        selectedReaction.innerText = `Você reagiu com: ${reactionName}`;
        });
    });


    // Adiciona a nova postagem no topo do feed
    feed.prepend(postElement);
    // Limpa os campos de entrada após a postagem
    document.getElementById('postContent').value = '';
    document.getElementById('postImage').value = '';
}
