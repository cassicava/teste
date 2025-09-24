document.addEventListener('DOMContentLoaded', () => {

    const produtos = {
      salgados: [
        { nome: "Frango", preco: 13 }, { nome: "Carne e Queijo", preco: 13 }, { nome: "Carne e Catupiry", preco: 13 }, { nome: "Frango e Queijo", preco: 14 }, { nome: "Frango e Catupiry", preco: 14 }, { nome: "Frango c/ Palmito", preco: 16 }, { nome: "Bauru", preco: 13 }, { nome: "Pizza", preco: 13 }, { nome: "Queijo", preco: 12 }, { nome: "Queijo e Catupiry", preco: 13 }, { nome: "Palmito", preco: 15 }, { nome: "Palmito com Queijo", preco: 16 }, { nome: "Palmito com Catupiry", preco: 16 }, { nome: "Cigarrete", preco: 9 }, { nome: "Baianinho", preco: 12 }, { nome: "Baianinho Queijo", preco: 13 }, { nome: "Baianinho Catupiry", preco: 13 }, { nome: "Calabresa", preco: 12 }, { nome: "Calabresa Queijo", preco: 13 }, { nome: "Calabresa Catupiry", preco: 13 }, { nome: "Creme de Milho", preco: 12 }, { nome: "Co-Có-Ri-Có", preco: 16 }, { nome: "Napolitano", preco: 14 }, { nome: "Hambúrguer", preco: 14 }, { nome: "Hot-Dog", preco: 16 }, { nome: "Quatro Queijos", preco: 16 }, { nome: "Português", preco: 16 }
      ],
      especiais: [
        { nome: "Especial de Carne", preco: 35 }, { nome: "Especial de Frango", preco: 35 }, { nome: "Especial de Palmito", preco: 35 }, { nome: "Especial de Português", preco: 35 }, { nome: "Especial de Calabresa", preco: 35 }, { nome: "Especial de Baianinho", preco: 35 }, { nome: "Especial de Co-Có-Ri-Có", preco: 35 }, { nome: "Especial de Carne Seca", preco: 40 }
      ],
      doces: [
        { nome: "Sonho de Valsa", preco: 16 }, { nome: "Ouro Branco", preco: 16 }, { nome: "Chocolate", preco: 15 }, { nome: "Chocolate Branco", preco: 15 }, { nome: "Café com Leite", preco: 15 }, { nome: "Brigadeiro", preco: 15 }, { nome: "Beijinho", preco: 15 }, { nome: "Doce de Leite", preco: 15 }, { nome: "Doce de Leite com Queijo", preco: 15 }, { nome: "Doce de Leite com Coco", preco: 15 }, { nome: "Romeu e Julieta", preco: 15 }, { nome: "Prestígio", preco: 15 }, { nome: "Suflair", preco: 20 }, { nome: "Kit Kat", preco: 20 }, { nome: "Nutella", preco: 20 }, { nome: "Ovomaltine", preco: 20 }, { nome: "Chocobacon", preco: 15 }
      ],
      bebidas: [
        { nome: "Refri 2L Coca-Cola", preco: 14 }, { nome: "Refri 2L Guaraná Antártica", preco: 13 }, { nome: "Refri 1L Guaraná Antártica", preco: 8.5 }, { nome: "Refri 2L Fanta", preco: 13 }, { nome: "Refri 2L Jaboti", preco: 8.5 }, { nome: "Refri Lata", preco: 6.5 }, { nome: "Refri 600ml", preco: 8 }, { nome: "Suco Garrafinha 450ml", preco: 4.5 }, { nome: "H2O", preco: 7.5 }, { nome: "Schweppes", preco: 6.5 }, { nome: "Água Mineral", preco: 4 }, { nome: "Água Tônica", preco: 7 }, { nome: "Cerveja Lata (Skol, Boa, Brahma)", preco: 6 }, { nome: "Cerveja Lata Subzero", preco: 5 }
      ]
    };
    
    // --- ELEMENTOS DA DOM ---
    const mainContent = document.querySelector('main');
    const listaCarrinho = document.getElementById('lista-carrinho');
    const valorTotal = document.getElementById('valor-total');
    const quantidadeCarrinho = document.getElementById('quantidade-carrinho');
    const valorTotalPopupValor = document.getElementById('valor-total-popup-valor');
    const popupCarrinho = document.getElementById('popup-carrinho');
    const btnFinalizar = document.getElementById('btn-finalizar');
    const btnFechar = document.getElementById('btn-fechar');
    const btnEnviar = document.getElementById('btn-enviar');
    
    let carrinho = [];

    // --- FUNÇÕES DE LÓGICA DO CARRINHO ---
    function adicionarProduto(nome, preco, botao) {
        const existente = carrinho.find(item => item.nome === nome);
        if (existente) {
            existente.quantidade++;
        } else {
            carrinho.push({ nome, preco, quantidade: 1 });
        }
        feedbackBotao(botao);
        atualizarCarrinho();
    }

    function feedbackBotao(botao) {
        if (!botao) return;

        botao.classList.add('added');
        botao.innerText = 'Adicionado ✓';
        botao.disabled = true;

        setTimeout(() => {
            botao.classList.remove('added');
            botao.innerText = 'Adicionar';
            botao.disabled = false;
        }, 1500);
    }

    function calcularTotal() {
        return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
    }

    function atualizarCarrinho() {
        const total = calcularTotal();
        const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
        valorTotal.innerText = total.toFixed(2).replace('.', ',');
        valorTotalPopupValor.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
        quantidadeCarrinho.innerText = totalItens;
        salvarCarrinhoNoLocalStorage();
    }

    // --- FUNÇÕES DE MANIPULAÇÃO DA TELA (UI) ---
    function criarProduto(produto, container) {
        const div = document.createElement('div');
        div.classList.add('produtos');
        
        div.innerHTML = `
            <div class="topo-produto">
                <h4>${produto.nome}</h4>
                <div class="preco-controle">
                    <h6>R$ ${produto.preco.toFixed(2).replace('.', ',')}</h6>
                    <button class="btn-add">Adicionar</button>
                </div>
            </div>`;
        
        container.appendChild(div);

        const addBtn = div.querySelector(".btn-add");
        addBtn.addEventListener("click", (e) => {
            adicionarProduto(produto.nome, produto.preco, e.target);
        });
    }

    function mostrarCarrinho() {
        listaCarrinho.innerHTML = '';
        if (carrinho.length === 0) {
            listaCarrinho.innerHTML = `<p class="carrinho-vazio">Seu carrinho está vazio.</p>`;
        } else {
            carrinho.forEach((item, index) => {
                const div = document.createElement('div');
                div.classList.add('item-carrinho');
                div.innerHTML = `
                    <div class="item-info">
                        <span>${item.quantidade}x ${item.nome}</span>
                        <span class="preco-item">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div class="controle-quantidade">
                        <button data-index="${index}" class="diminuir">-</button>
                        <span>${item.quantidade}</span>
                        <button data-index="${index}" class="aumentar">+</button>
                    </div>
                `;
                listaCarrinho.appendChild(div);
            });
            const btnEsvaziarDinamico = document.createElement('button');
            btnEsvaziarDinamico.className = 'btn-esvaziar-estilo';
            btnEsvaziarDinamico.textContent = 'Esvaziar Carrinho';
            btnEsvaziarDinamico.onclick = () => {
                if (confirm("Tem certeza que deseja remover todos os itens do carrinho?")) {
                    carrinho = [];
                    atualizarCarrinho();
                    mostrarCarrinho();
                }
            };
            listaCarrinho.appendChild(btnEsvaziarDinamico);
        }
        document.body.classList.add('popup-aberto');
        popupCarrinho.classList.add('show');
    }

    function alterarQuantidade(index, delta) {
        carrinho[index].quantidade += delta;
        if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
        }
        mostrarCarrinho();
        atualizarCarrinho();
    }
    
    // Delegação de eventos para botões de quantidade no carrinho
    listaCarrinho.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (index === undefined) return;
        
        if (e.target.classList.contains('aumentar')) {
            alterarQuantidade(index, 1);
        } else if (e.target.classList.contains('diminuir')) {
            alterarQuantidade(index, -1);
        }
    });

    // --- LOCAL STORAGE ---
    function salvarCarrinhoNoLocalStorage() {
        localStorage.setItem('carrinhoRoldaoPastel', JSON.stringify(carrinho));
    }

    function carregarCarrinhoDoLocalStorage() {
        const carrinhoSalvo = localStorage.getItem('carrinhoRoldaoPastel');
        if (carrinhoSalvo) {
            carrinho = JSON.parse(carrinhoSalvo);
            atualizarCarrinho();
        }
    }

    // --- LÓGICA DO FORMULÁRIO DINÂMICO ---
    const tipoPedidoRadios = document.querySelectorAll('input[name="tipo-pedido"]');
    const camposEntregaContainer = document.getElementById('campos-entrega-container');
    const formaPagamentoRadios = document.querySelectorAll('input[name="forma-pagamento"]');
    const campoTrocoContainer = document.getElementById('campo-troco-container');

    tipoPedidoRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            camposEntregaContainer.style.display = event.target.value === 'entrega' ? 'flex' : 'none';
        });
    });

    formaPagamentoRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            campoTrocoContainer.style.display = event.target.value === 'dinheiro' ? 'flex' : 'none';
        });
    });

    // --- MENU DE NAVEGAÇÃO INTELIGENTE ---
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section.tipos');

    mainContent.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Ajuste de offset
            if (mainContent.scrollTop >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- EVENT LISTENERS ---
    btnFinalizar.addEventListener('click', mostrarCarrinho);
    btnFechar.addEventListener('click', () => {
        document.body.classList.remove('popup-aberto');
        popupCarrinho.classList.remove('show');
    });

    btnEnviar.addEventListener('click', () => {
        const nomeCliente = document.getElementById('nome-cliente').value.trim();
        const tipoPedidoRadio = document.querySelector('input[name="tipo-pedido"]:checked');

        if (carrinho.length === 0) { alert("Seu carrinho está vazio!"); return; }
        if (!nomeCliente) { alert("Por favor, preencha seu nome."); return; }
        if (!tipoPedidoRadio) { alert("Por favor, selecione o tipo de pedido (Entrega ou Retirada)."); return; }
        
        const tipoPedido = tipoPedidoRadio.value;
        const total = calcularTotal();
        const itensPedido = carrinho.map(p => `- ${p.quantidade}x ${p.nome}`).join('\n');
        
        let mensagem = `*NOVO PEDIDO - ROLDÃO PASTEL*\n\n*Cliente:* ${nomeCliente}\n`;

        if (tipoPedido === 'entrega') {
            const endereco = document.getElementById('endereco-cliente').value.trim();
            const formaPagamentoRadio = document.querySelector('input[name="forma-pagamento"]:checked');
            
            if (!endereco) { alert("Por favor, preencha seu endereço para entrega."); return; }
            if (!formaPagamentoRadio) { alert("Por favor, selecione a forma de pagamento."); return; }
            
            const formaPagamento = formaPagamentoRadio.value;
            let infoPagamento = `*Pagamento:* ${formaPagamento === 'dinheiro' ? 'Dinheiro' : 'Cartão'}`;

            if (formaPagamento === 'dinheiro') {
                const trocoPara = parseFloat(document.getElementById('troco-pedido').value);
                if (trocoPara && trocoPara >= total) {
                    const troco = trocoPara - total;
                    infoPagamento += `\n*Levar troco para R$ ${trocoPara.toFixed(2).replace('.',',')}* (Troco: R$ ${troco.toFixed(2).replace('.',',')})`;
                } else if (trocoPara && trocoPara < total) {
                    alert("O valor para troco não pode ser menor que o total do pedido.");
                    return;
                }
            }
            
            mensagem += `*Tipo de Pedido:* ENTREGA\n*Endereço:* ${endereco}\n\n*Itens do Pedido:*\n${itensPedido}\n\n*Total: R$ ${total.toFixed(2).replace('.',',')}*\n${infoPagamento}`;

        } else { // Retirada
            mensagem += `*Tipo de Pedido:* RETIRADA NO LOCAL\n\n*Itens do Pedido:*\n${itensPedido}\n\n*Total: R$ ${total.toFixed(2).replace('.',',')}*`;
        }
        
        const originalButtonHTML = btnEnviar.innerHTML;
        btnEnviar.innerHTML = 'Enviando...';
        btnEnviar.disabled = true;

        setTimeout(() => {
            const url = `https://wa.me/5516997110599?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
            
            carrinho = [];
            atualizarCarrinho();
            localStorage.removeItem('carrinhoRoldaoPastel');
            
            document.body.classList.remove('popup-aberto');
            popupCarrinho.classList.remove('show');
            btnEnviar.innerHTML = originalButtonHTML;
            btnEnviar.disabled = false;
        }, 500);
    });
    
    // --- INICIALIZAÇÃO ---
    carregarCarrinhoDoLocalStorage();
    const categoriaMap = {
        salgados: 'salgados',
        especiais: 'especiais',
        doces: 'doces',
        bebidas: 'bebidas'
    };

    Object.keys(categoriaMap).forEach(key => {
        const container = document.getElementById(`lista-produtos-${key}`);
        if (container) {
            const categoriaProdutos = produtos[categoriaMap[key]];
            if (categoriaProdutos) {
                categoriaProdutos.forEach(produto => criarProduto(produto, container));
            }
        }
    });
});