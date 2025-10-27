'use strict';

// Função principal que será executada assim que a página carregar.
async function iniciarSite() {
    try {
        const response = await fetch('assets/data/metadata.json');
        if (!response.ok) {
            throw new Error('Falha ao carregar os dados (metadata.json).');
        }
        const dados = await response.json();

        // 1. Popular a frase principal
        document.getElementById('frase-principal').innerText = dados.casal.frasePrincipal;

        // 2. Iniciar o contador.
        iniciarContador(dados.casal.dataInicioNamoro);

        // 3. Popular a galeria de fotos.
        popularGaleria(dados.galeria);

        // 4. Iniciar os "ouvintes" do lightbox de fotos.
        iniciarLightboxFotos();
        
        // 5. Popular as mensagens "Leia quando"
        popularMensagens(dados.mensagens);
        
        // 6. Iniciar os "ouvintes" do modal de texto
        iniciarModalTexto();

        // 7. Popular a playlist
        popularPlaylist(dados.playlist); // <--- NOVA FUNÇÃO

    } catch (error) {
        console.error('Erro ao iniciar o site:', error);
        document.body.innerHTML = '<h1 style="color: white; text-align: center; margin-top: 50px;">Erro ao carregar o site. Tente novamente.</h1>';
    }
}

// -------------------------------------------------
// FUNÇÃO DO CONTADOR (sem mudanças)
// -------------------------------------------------
function iniciarContador(dataInicio) {
    const elAnos = document.getElementById('anos');
    const elMeses = document.getElementById('meses');
    const elDias = document.getElementById('dias');
    const elHoras = document.getElementById('horas');
    const elMinutos = document.getElementById('minutos');
    const elSegundos = document.getElementById('segundos');
    
    if (!elAnos) return;

    const dataAlvo = new Date(dataInicio);

    function atualizarContador() {
        const agora = new Date();
        
        let anos = agora.getFullYear() - dataAlvo.getFullYear();
        let meses = agora.getMonth() - dataAlvo.getMonth();
        let dias = agora.getDate() - dataAlvo.getDate();
        let horas = agora.getHours() - dataAlvo.getHours();
        let minutos = agora.getMinutes() - dataAlvo.getMinutes();
        let segundos = agora.getSeconds() - dataAlvo.getSeconds();

        if (segundos < 0) { minutos--; segundos += 60; }
        if (minutos < 0) { horas--; minutos += 60; }
        if (horas < 0) { dias--; horas += 24; }
        if (dias < 0) {
            meses--;
            const ultimoDiaDoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
            dias += ultimoDiaDoMesAnterior;
        }
        if (meses < 0) { anos--; meses += 12; }

        elAnos.innerText = String(anos).padStart(2, '0');
        elMeses.innerText = String(meses).padStart(2, '0');
        elDias.innerText = String(dias).padStart(2, '0');
        elHoras.innerText = String(horas).padStart(2, '0');
        elMinutos.innerText = String(minutos).padStart(2, '0');
        elSegundos.innerText = String(segundos).padStart(2, '0');
    }

    atualizarContador();
    setInterval(atualizarContador, 1000);
}

// -------------------------------------------------
// FUNÇÕES DA GALERIA E LIGHTBOX (sem mudanças)
// -------------------------------------------------
function popularGaleria(galeria) {
    const container = document.getElementById('galeria-container');
    if (!container) return;
    container.innerHTML = '';

    galeria.forEach(item => {
        const cardHTML = `
            <div class="gallery-item">
                <img src="${item.src}" alt="${item.alt}" loading="lazy">
                <p class="declaracao">${item.declaracao}</p>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

function iniciarLightboxFotos() {
    const galeriaContainer = document.getElementById('galeria-container');
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeButton = lightbox.querySelector('.lightbox-close');

    if (!galeriaContainer || !lightbox) return;

    galeriaContainer.addEventListener('click', (e) => {
        const img = e.target.closest('.gallery-item img');
        if (img) {
            const card = img.closest('.gallery-item');
            const declaracao = card.querySelector('.declaracao').innerText;
            lightboxImg.src = img.src;
            lightboxCaption.innerText = declaracao;
            lightbox.classList.add('visible');
        }
    });

    function fecharLightbox() {
        lightbox.classList.remove('visible');
    }

    closeButton.addEventListener('click', fecharLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            fecharLightbox();
        }
    });
}

// -------------------------------------------------
// FUNÇÕES "LEIA QUANDO..." (sem mudanças)
// -------------------------------------------------
function popularMensagens(mensagens) {
    const container = document.getElementById('palavras-container');
    if (!container) return;
    container.innerHTML = '';

    mensagens.forEach(msg => {
        const botao = document.createElement('button');
        botao.className = 'prompt-button';
        botao.innerText = msg.prompt;
        botao.dataset.titulo = msg.titulo;
        botao.dataset.conteudo = msg.conteudo;
        container.appendChild(botao);
    });
}

function iniciarModalTexto() {
    const container = document.getElementById('palavras-container');
    const modal = document.getElementById('texto-modal-overlay');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalTexto = document.getElementById('modal-texto');
    const closeButton = modal.querySelector('.modal-close');

    if (!container || !modal) return;

    container.addEventListener('click', (e) => {
        const botao = e.target.closest('.prompt-button');
        if (botao) {
            const titulo = botao.dataset.titulo;
            const conteudo = botao.dataset.conteudo;
            modalTitulo.innerText = titulo;
            modalTexto.innerText = conteudo;
            modal.classList.add('visible');
        }
    });

    function fecharModal() {
        modal.classList.remove('visible');
    }

    closeButton.addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });
}

// ==========================================================
//          NOVA FUNÇÃO: POPULAR A PLAYLIST
// ==========================================================
function popularPlaylist(playlist) {
    const container = document.getElementById('playlist-container');
    if (!container || !playlist.url) return;

    // Verifica se é do Spotify (no futuro, poderíamos adicionar "youtube")
    if (playlist.tipo === 'spotify') {
        const iframe = document.createElement('iframe');
        
        // Em telas pequenas, o player compacto (152px) é melhor.
        // Em telas maiores, usamos o padrão (352px).
        const alturaPlayer = window.innerWidth < 768 ? '152' : '352';

        iframe.src = playlist.url;
        iframe.width = "100%";
        iframe.height = alturaPlayer;
        iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
        iframe.loading = "lazy"; // Boa prática: só carrega o player quando o usuário rola até ele.

        container.appendChild(iframe);
    }
}

// Inicia todo o nosso script quando o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', iniciarSite);