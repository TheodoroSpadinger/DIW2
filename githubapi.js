document.addEventListener('DOMContentLoaded', function() {
  const username = 'TheodoroSpadinger'; // Define o nome de usuário do GitHub
  const token = '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'; // Substitua pelo seu token pessoal
  const url = `https://api.github.com/users/${username}/repos`;

  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Verifique os dados recebidos no console

      // Manipule os dados como necessário e atualize o DOM
      const reposContainer = document.getElementById('reposContainer');
      if (reposContainer) {
        data.forEach(repo => {
          const card = document.createElement('div');
          card.classList.add('col');
          card.innerHTML = `
            <div class="card">
              <a href="${repo.html_url}" class="linkrepositorio">
                <div class="card-body">
                  <h3 class="card-title">${repo.name}</h3>
                  <p class="card-text">${repo.description || 'Sem descrição'}</p>
                </div>
              </a>
              <div class="card-footer">
                <i class="fa-solid fa-star"> ${repo.stargazers_count}</i>
                <i class="fa-solid fa-user"> ${repo.forks_count}</i>
              </div>
            </div>
          `;
          reposContainer.appendChild(card);
        });
      } else {
        console.error('Elemento #reposContainer não encontrado.');
      }
    })
    .catch(error => {
      console.error('Erro ao buscar repositórios:', error);
    });
});