document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'http://localhost:3000'; 

  
  function carregarPerfil() {
    fetch(`${apiUrl}/perfil`)
      .then(response => response.json())
      .then(data => {
        // Exibir nome e descrição do perfil
        const perfilHeader = document.getElementById('perfilHeader');
        perfilHeader.innerHTML = `
          <h2>${data.nome}</h2>
          <p class="ms-6">${data.descricao}</p>
          <p class="localizacao"><b>Localização:</b> ${data.localizacao}</p>
        `;
      })
      .catch(error => console.error('Erro ao buscar perfil:', error));
  }

 
  carregarPerfil();

  
  const username = 'TheodoroSpadinger';
  const githubInfoUrl = `https://api.github.com/users/${username}`;

  
  fetch(githubInfoUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('github-repos').innerText = `Repositórios públicos: ${data.public_repos}`;
      document.getElementById('github-followers').innerText = `Seguidores: ${data.followers}`;
    })
    .catch(error => {
      console.error('Erro ao buscar informações do GitHub:', error);
      document.getElementById('github-repos').innerText = 'Erro ao buscar repositórios';
      document.getElementById('github-followers').innerText = 'Erro ao buscar seguidores';
    });

 
  const token = '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'; 
  const reposUrl = `https://api.github.com/users/${username}/repos`;

  
  fetch(reposUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
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

  
  const conteudosSugeridosUrl = `${apiUrl}/conteudosSugeridos`; 

  fetch(conteudosSugeridosUrl)
    .then(response => response.json())
    .then(data => {
      const carouselInner = document.querySelector('#carouselExampleControls .carousel-inner');

      data.forEach((conteudo, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
          carouselItem.classList.add('active');
        }

        const img = document.createElement('img');
        img.src = conteudo.urlImagemCapa;
        img.alt = conteudo.titulo;
        img.classList.add('d-block', 'w-100');

        const carouselCaption = document.createElement('div');
        carouselCaption.classList.add('carousel-caption', 'd-none', 'd-md-block');
        carouselCaption.innerHTML = `
          <h5>${conteudo.titulo}</h5>
          <p>${conteudo.descricao}</p>
        `;

        carouselItem.appendChild(img);
        carouselItem.appendChild(carouselCaption);
        carouselInner.appendChild(carouselItem);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar conteúdos sugeridos:', error);
      
    });

  
  const colegasDeTrabalhoUrl = `${apiUrl}/colegasDeTrabalho`;

  fetch(colegasDeTrabalhoUrl)
    .then(response => response.json())
    .then(data => {
      const colegasContainer = document.getElementById('colegasContainer');
      if (colegasContainer) {
        data.forEach(colega => {
          const col = document.createElement('div');
          col.classList.add('col-md-2');

          const img = document.createElement('img');
          img.src = colega.urlFoto;
          img.alt = colega.nome;
          img.classList.add('img-fluid');

          const p = document.createElement('p');
          p.classList.add('text-center');
          const a = document.createElement('a');
          a.href = colega.urlGitHub;
          a.textContent = colega.nome;
          a.target = '_blank'; 

          p.appendChild(a);
          col.appendChild(img);
          col.appendChild(p);

          colegasContainer.appendChild(col);
        });
      } else {
        console.error('Elemento #colegasContainer não encontrado.');
      }
    })
    .catch(error => {
      console.error('Erro ao buscar colegas de trabalho:', error);
      
    });
});