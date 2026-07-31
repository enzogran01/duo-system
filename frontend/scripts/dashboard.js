// ===== SHOW SECTIONS BUTTONS =====
const fichasSectionBtn = document.getElementById("fichasSectionBtn");
const atendimentosSectionBtn = document.getElementById("atendimentosSectionBtn");
const calendarioSectionBtn = document.getElementById("calendarioSectionBtn");

const fichasSection = document.getElementById("fichasSection");
const atendimentosSection = document.getElementById("atendimentosSection");
const calendarioSection = document.getElementById("calendarioSection");

const sections = [fichasSection, atendimentosSection, calendarioSection];

function showSection(sectionToShow) {
    sections.forEach(section => {
        if (section && sectionToShow) {
            if (section === sectionToShow) {
                section.classList.remove('hidden');
                if (section === calendarioSection) {
                    section.classList.add('flex');
                }
            } else {
                section.classList.add('hidden');
                if (section === calendarioSection) {
                    section.classList.remove('flex');
                }
            }
        }
    });
}

if (fichasSectionBtn) fichasSectionBtn.addEventListener('click', () => showSection(fichasSection));
if (atendimentosSectionBtn) atendimentosSectionBtn.addEventListener('click', () => showSection(atendimentosSection));
if (calendarioSectionBtn) calendarioSectionBtn.addEventListener('click', () => showSection(calendarioSection));

// ===== SEARCH PACIENTE FUNCTIONALITY =====
const searchInput = document.getElementById("searchPaciente");
const fichaCards = document.querySelectorAll('[data-nome]');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    fichaCards.forEach(card => {
        const nome = card.dataset.nome.toLowerCase();
        const telefone = card.dataset.telefone.toLowerCase();
        const profissao = card.dataset.profissao.toLowerCase();

        if (nome.includes(searchTerm) || telefone.includes(searchTerm) || profissao.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// ===== SEARCH AND PAGINATION ATENDIMENTO FUNCTIONALITY =====
const searchAtendimentoInput = document.getElementById("searchAtendimento");
const atendimentosRows = Array.from(document.querySelectorAll('#tabelaAtendimentos tbody tr'));
const semResultadosAtendimento = document.getElementById("semResultados");

// Elementos de paginação
const paginacaoAtendimentos = document.getElementById("paginacaoAtendimentos");
const btnAnteriorAtendimentos = document.getElementById("btnAnteriorAtendimentos");
const btnProximoAtendimentos = document.getElementById("btnProximoAtendimentos");
const infoPaginaAtendimentos = document.getElementById("infoPaginaAtendimentos");

let paginaAtual = 1;
const itensPorPagina = 10;
let linhasFiltradas = [...atendimentosRows];

function atualizarPaginacao() {
    const totalPaginas = Math.ceil(linhasFiltradas.length / itensPorPagina) || 1;
    
    // Esconde todas as linhas
    atendimentosRows.forEach(row => row.style.display = 'none');
    
    // Mostra apenas as linhas da página atual
    const startIndex = (paginaAtual - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;
    const rowsToShow = linhasFiltradas.slice(startIndex, endIndex);
    
    rowsToShow.forEach(row => row.style.display = '');

    // Atualiza a UI de paginação
    if (paginacaoAtendimentos) {
        if (linhasFiltradas.length > itensPorPagina) {
            paginacaoAtendimentos.classList.remove('hidden');
            infoPaginaAtendimentos.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
            btnAnteriorAtendimentos.disabled = paginaAtual === 1;
            btnProximoAtendimentos.disabled = paginaAtual === totalPaginas;
        } else {
            paginacaoAtendimentos.classList.add('hidden');
        }
    }

    // Atualiza a mensagem de "sem resultados"
    if (semResultadosAtendimento) {
        if (linhasFiltradas.length === 0 && atendimentosRows.length > 0) {
            semResultadosAtendimento.classList.remove('hidden');
            semResultadosAtendimento.classList.add('flex');
        } else {
            semResultadosAtendimento.classList.add('hidden');
            semResultadosAtendimento.classList.remove('flex');
        }
    }
}

if (searchAtendimentoInput) {
    atualizarPaginacao(); // Configuração inicial

    searchAtendimentoInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        linhasFiltradas = atendimentosRows.filter(row => {
            const cliente = (row.dataset.cliente || '').toLowerCase();
            const data_atendimento = (row.dataset.data_atendimento || '').toLowerCase();
            const servico = (row.dataset.servico || '').toLowerCase();
            const queixa = (row.dataset.queixa || '').toLowerCase();
            const profissional = (row.dataset.profissional || '').toLowerCase();

            return data_atendimento.includes(searchTerm) || cliente.includes(searchTerm) || servico.includes(searchTerm) || queixa.includes(searchTerm) || profissional.includes(searchTerm);
        });

        paginaAtual = 1; // Volta para a primeira página ao pesquisar
        atualizarPaginacao();
    });
}

if (btnAnteriorAtendimentos && btnProximoAtendimentos) {
    btnAnteriorAtendimentos.addEventListener('click', () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            atualizarPaginacao();
        }
    });

    btnProximoAtendimentos.addEventListener('click', () => {
        const totalPaginas = Math.ceil(linhasFiltradas.length / itensPorPagina) || 1;
        if (paginaAtual < totalPaginas) {
            paginaAtual++;
            atualizarPaginacao();
        }
    });
}

// ===== SHOW DETAILS FICHA BUTTON =====
const detalhesFichaButtons = document.querySelectorAll('.detalhes-ficha');

detalhesFichaButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const fichaCard = button.closest('[data-nome]');
        const _id = fichaCard.dataset.id;

        try {
            const dados = await fetch(`http://localhost:3000/ficha/${_id}`);
            
            if (!dados.ok) {
                const erro = await dados.text();
                console.error('Resposta do servidor:', erro);
                throw new Error(`Erro ${dados.status}: ${dados.statusText}`);
            }
            
            const dadosJson = await dados.json();
            console.log(dadosJson) //debug
        } catch (error) {
            console.error('Erro completo:', error);
        }
    });
});

// ===== CALENDAR FUNCTIONALITY =====
const calendarGrid = document.getElementById("calendarGrid");
const currentMonthLabel = document.getElementById("currentMonthLabel");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

// Modal elements
const dayModal = document.getElementById("dayModal");
const dayModalTitle = document.getElementById("dayModalTitle");
const dayModalContent = document.getElementById("dayModalContent");
const closeDayModal = document.getElementById("closeDayModal");

let currentDate = new Date(); // Start with current date

// Using window.atendimentosData from dashboard.ejs
const atendimentosList = window.atendimentosData || [];

function renderCalendar(date) {
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';
    
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Configura o label do mês atual
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    currentMonthLabel.textContent = `${monthNames[month]} ${year}`;
    
    // Primeiro dia do mês
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Quantidade de dias no mês
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Renderiza blocos vazios para o inicio do mês
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "min-h-[80px] sm:min-h-[100px] border border-gray-100 rounded-lg bg-gray-50/50 hidden sm:block";
        // Em telas pequenas, podemos omitir os blocos vazios se quisermos, mas como é grid, melhor deixar.
        emptyDiv.classList.remove('hidden', 'sm:block'); // Mantém pra estruturar o grid
        calendarGrid.appendChild(emptyDiv);
    }
    
    // Renderiza os dias
    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "min-h-[80px] sm:min-h-[100px] border border-gray-200 rounded-lg p-1 sm:p-2 flex flex-col bg-white transition-all hover:border-action/50 hover:shadow-sm cursor-pointer relative group overflow-hidden";
        
        const dayNumber = document.createElement("span");
        dayNumber.className = "text-xs sm:text-sm font-medium text-gray-700 mb-1";
        dayNumber.textContent = i;
        dayDiv.appendChild(dayNumber);
        
        // Verifica se hoje é este dia para destacar
        const today = new Date();
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayNumber.className = "text-xs sm:text-sm font-bold text-white bg-action w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full mb-1";
            dayDiv.classList.add("ring-1", "ring-action/30", "bg-blue-50/10");
        }
        
        // Encontra atendimentos para este dia
        const dayAtendimentos = atendimentosList.filter(atend => {
            if (!atend.data_atendimento) return false;
            const dateStr = atend.data_atendimento.split('T')[0]; // ex: "2023-10-25"
            const [aYear, aMonth, aDay] = dateStr.split('-');
            
            return parseInt(aYear) === year && parseInt(aMonth) - 1 === month && parseInt(aDay) === i;
        });
        
        if (dayAtendimentos.length > 0) {
            const badgesContainer = document.createElement("div");
            badgesContainer.className = "flex flex-col gap-1 overflow-hidden mt-1 sm:mt-0";
            
            // Renderiza ate 2 badges para não estourar o layout
            const maxBadges = window.innerWidth < 640 ? 1 : 2; // Em telas muito pequenas mostra só 1 badge
            for(let j = 0; j < Math.min(dayAtendimentos.length, maxBadges); j++) {
                const badge = document.createElement("div");
                badge.className = "text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded truncate border border-blue-200 font-medium leading-tight";
                badge.textContent = dayAtendimentos[j].ficha?.nome || 'Atendimento';
                badgesContainer.appendChild(badge);
            }
            
            if (dayAtendimentos.length > maxBadges) {
                const moreBadge = document.createElement("div");
                moreBadge.className = "text-[10px] sm:text-xs px-1 text-gray-500 font-medium";
                moreBadge.textContent = `+${dayAtendimentos.length - maxBadges} mais`;
                badgesContainer.appendChild(moreBadge);
            }
            
            dayDiv.appendChild(badgesContainer);
        }
        
        // Event listener para abrir modal
        dayDiv.addEventListener('click', () => {
            openDayModal(i, month, year, dayAtendimentos);
        });
        
        calendarGrid.appendChild(dayDiv);
    }
}

function openDayModal(day, month, year, dayAtendimentos) {
    if (!dayModal) return;
    
    dayModal.classList.remove('hidden');
    
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    dayModalTitle.textContent = `Atendimentos - ${day} de ${monthNames[month]} de ${year}`;
    
    dayModalContent.innerHTML = '';
    
    if (dayAtendimentos.length === 0) {
        dayModalContent.innerHTML = '<p class="text-gray-500 text-center py-4">Nenhum atendimento marcado para este dia.</p> <br> <a href="/atendimento/new" class="text-white w-full sm:w-auto bg-action rounded-sm py-1 px-3 sm:py-4 sm:px-6 border cursor-pointer transition-all hover:-translate-y-1">Adicionar atendimento</a>';
        return;
    }
    
    dayAtendimentos.forEach(atend => {
        const card = document.createElement("div");
        card.className = "border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors flex flex-col gap-2";
        
        const pacienteName = atend.ficha?.nome || 'Desconhecido';
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <h4 class="font-bold text-gray-800">${pacienteName}</h4>
                <div class="flex items-center gap-2">
                    <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200 font-medium">${atend.horario || '-'}</span>
                    <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200 font-medium">${atend.servico || '-'}</span>
                </div>
            </div>
            <p class="text-sm text-gray-600 line-clamp-2"><span class="font-medium">Queixa:</span> ${atend.queixa || '-'}</p>
            <p class="text-sm text-gray-600"><span class="font-medium">Profissional:</span> ${atend.profissional || '-'}</p>
            <a href="/atendimento/${atend._id}" class="text-action text-sm font-medium mt-1 hover:underline w-fit">Ver detalhes &rarr;</a>
        `;
        
        dayModalContent.appendChild(card);
    });
}

if (closeDayModal) {
    closeDayModal.addEventListener('click', () => {
        dayModal.classList.add('hidden');
    });
    
    // Fechar clicando fora
    dayModal.addEventListener('click', (e) => {
        if (e.target === dayModal) {
            dayModal.classList.add('hidden');
        }
    });
}

if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
}

// Escuta resize da tela para adaptar o num de badges renderizados
window.addEventListener('resize', () => {
    // Apenas se o calendario estiver aberto
    if (calendarioSection && !calendarioSection.classList.contains('hidden')) {
        renderCalendar(currentDate);
    }
});

// Inicializa o calendario
if (calendarGrid) {
    renderCalendar(currentDate);
}
