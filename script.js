// Views

const btnChamados = document.querySelector(".view-btn:first-child");

const btnGrupos = document.querySelector(".view-btn:last-child");

const ticketsView = document.querySelector(".tickets-view");

const groupsView = document.querySelector(".groups-view");

const ticketSearch = document.querySelector(".ticket-search");

const statusFilter = document.querySelector(".status-filter");

const sortTickets = document.querySelector("#sort-tickets");

const ticketForm = document.querySelector("#ticket-form");

const ticketsList = document.querySelector(".tickets-list");

const newTicketBtn = document.querySelector(".topbar .new-ticket-btn");

const ticketModal = document.querySelector("#ticket-modal");

const closeTicketModalBtn = document.querySelector(".close-ticket-modal");

const ticketGroupSelect = document.querySelector("#ticket-group");

const topbarGroupSelect = document.querySelector("#group-select");

let ticketsExpandidos = new Set();
let todosExpandidos = false;

// Troca de view

btnChamados.addEventListener("click", () => {
  ticketsView.classList.remove("hidden");
  groupsView.classList.add("hidden");
  btnChamados.classList.add("active");
  btnGrupos.classList.remove("active");
  ticketSearch.classList.remove("hidden");
  statusFilter.classList.remove("hidden");
  sortTickets.classList.remove("hidden");
});

btnGrupos.addEventListener("click", () => {
  groupsView.classList.remove("hidden");
  ticketsView.classList.add("hidden");
  btnGrupos.classList.add("active");
  btnChamados.classList.remove("active");
  ticketSearch.classList.add("hidden");
  statusFilter.classList.add("hidden");
  sortTickets.classList.add("hidden");
});

// modal criar grupo

const newGroupBtn = document.querySelector(".secondary-btn");
const groupModal = document.querySelector("#group-modal");
const closeModalBtn = document.querySelector(".close-modal");

// abrir modal

newGroupBtn.addEventListener("click", () => {
  groupModal.classList.remove("hidden");
});

// fechar modal

closeModalBtn.addEventListener("click", () => {
  groupModal.classList.add("hidden");
});

// Array grupos

const grupos = JSON.parse(localStorage.getItem("groups")) || [];

// Array chamados
const chamados = JSON.parse(localStorage.getItem("tickets")) || [];

// Formulário

const groupForm = document.querySelector("#group-form");

// Container de grupos

const groupsList = document.querySelector(".groups-list");

// Renderização de grupos

function renderGroups() {
  // limpa lista antes de renderizar novamente
  groupsList.innerHTML = "";
  // percorre array
  grupos.forEach((grupo) => {
    // cria card
    const groupCard = document.createElement("div");
    groupCard.classList.add("group-card");
    const chamadosDoGrupo = chamados.filter(
      (ticket) => ticket.grupoId == grupo.id,
    );
    const totalChamados = chamadosDoGrupo.length;
    const chamadosAbertos = chamadosDoGrupo.filter((ticket) =>
      ["Pendente", "Em Progresso", "Pausado"].includes(ticket.status),
    ).length;
    // conteúdo
    groupCard.innerHTML = `
  <div class="group-card-layout">
    <div class="group-info">
      <h3>${grupo.nome}</h3>
      <span>${grupo.prefixo}</span>
    </div>
    <div class="group-card-stats">
      <div class="group-stat">
        <small>
          Chamados Abertos
        </small>
        <strong>
          ${chamadosAbertos}
        </strong>
      </div>
      <div class="group-stat">
        <small>
          Total
        </small>
        <strong>
           ${totalChamados}
        </strong>
      </div>
    </div>
    <div class="group-card-actions">
      <button class="save-group-btn">
        Exportar CSV
      </button>
      <button
        class="delete-group-btn"
        data-id="${grupo.id}"
      >
        Apagar
      </button>
    </div>
  </div>
`;
    // adiciona no container
    groupsList.appendChild(groupCard);
  });
  document.querySelectorAll(".delete-group-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const indice = grupos.findIndex((grupo) => grupo.id === id);
      grupos.splice(indice, 1);
      saveGroups();
      refreshUI();
      populateGroupSelects();
    });
  });
  document.querySelectorAll(".save-group-btn").forEach((button, index) => {
    button.addEventListener("click", () => {
      exportGroupCSV(grupos[index].id);
    });
  });
}

//render chamado

function renderTickets() {
  ticketsList.innerHTML = "";
  const selectedGroup = topbarGroupSelect.value;
  const selectedStatus = statusFilter.value;
  let ticketsFiltrados =
    selectedGroup === "all"
      ? [...chamados]
      : chamados.filter((ticket) => ticket.grupoId == selectedGroup);
  const searchTerm = ticketSearch.value.trim().toLowerCase();
  if (searchTerm) {
    ticketsFiltrados = ticketsFiltrados.filter((ticket) => {
      return (
        ticket.codigo.toLowerCase().includes(searchTerm) ||
        ticket.titulo.toLowerCase().includes(searchTerm) ||
        ticket.solicitante.toLowerCase().includes(searchTerm) ||
        (ticket.responsavel || "").toLowerCase().includes(searchTerm)
      );
    });
  }
  if (selectedStatus !== "Todos") {
    ticketsFiltrados = ticketsFiltrados.filter((ticket) => {
      switch (selectedStatus) {
        case "Ativos":
          return ["Pendente", "Em Progresso", "Pausado"].includes(
            ticket.status,
          );
        case "Finalizados":
          return ["Concluído", "Cancelado"].includes(ticket.status);
        default:
          return ticket.status === selectedStatus;
      }
    });
  }
  switch (sortTickets.value) {
    case "newest":
      ticketsFiltrados.sort((a, b) => b.id - a.id);
      break;
    case "oldest":
      ticketsFiltrados.sort((a, b) => a.id - b.id);
      break;
    case "priority":
      const prioridades = {
        Crítica: 4,
        Alta: 3,
        Média: 2,
        Baixa: 1,
      };
      ticketsFiltrados.sort(
        (a, b) => prioridades[b.criticidade] - prioridades[a.criticidade],
      );
      break;
  }
  ticketsFiltrados.forEach((ticket) => {
    const expandido = ticketsExpandidos.has(ticket.id);
    const ticketCard = document.createElement("div");
    ticketCard.classList.add("ticket-card");
    if (!expandido) {
      ticketCard.classList.add("collapsed");
    }
    const comentarios = ticket.comentarios || [];
    const comentariosHTML = comentarios
      .map(
        (comentario) => `
          <div class="comment-item">
            <strong>
              ${comentario.autor}
            </strong>
            <p>
              ${comentario.texto}
            </p>
            <small>
             ${comentario.data}
            </small>
          </div>
        `,
      )
      .join("");
    let actionButton = "";
    switch (ticket.status) {
      case "Pendente":
        actionButton = `
          <button
            class="ticket-action-btn"
            data-id="${ticket.id}"
            data-action="start"
          >
            Avançar chamado
          </button>
        `;
        break;
      case "Em Progresso":
        actionButton = `
          <div class="ticket-actions">
            <button
             class="ticket-action-btn"
              data-id="${ticket.id}"
              data-action="pause"
            >
             Pausar
            </button>
            <button
             class="ticket-action-btn"
              data-id="${ticket.id}"
             data-action="finish"
            >
              Concluir
            </button>
           <button
              class="ticket-action-btn danger"
              data-id="${ticket.id}"
              data-action="cancel"
            >
              Cancelar
            </button>
          </div>
        `;
        break;
      case "Pausado":
        actionButton = `
          <button
            class="ticket-action-btn"
           data-id="${ticket.id}"
           data-action="resume"
          >
            Retomar chamado
          </button>
        `;
        break;
    }
    ticketCard.innerHTML = `
    <div class="ticket-layout">
    <div class="ticket-main ${expandido ? "expanded" : "collapsed-card"}">
      <div class="ticket-card-header">
        <div>
          <div class="ticket-title-row">
            <h3>
              ${ticket.codigo}
            </h3>
            <span class="ticket-title">
              ${ticket.titulo}
            </span>
          </div>
        </div>
        <div class="ticket-header-right">
          <div
            class="priority-badge priority-${ticket.criticidade.toLowerCase()}"
          >
            ${ticket.criticidade}
          </div>
          <div
            class="ticket-badge status-${ticket.status
              .toLowerCase()
              .replace(" ", "-")}"
          >
            ${ticket.status}
        </div>
        </div>
      </div>
      <p
        class="ticket-description collapsed"
        >
          ${ticket.descricao}
      </p>
        <button class="expand-description-btn">Ver mais</button>
      <div class="ticket-people">
        <div>
          <strong>Solicitante:</strong>
          ${ticket.solicitante || "-"}
        </div>
        <div>
          <strong>Responsável:</strong>
          ${ticket.responsavel || "-"}
        </div>
      </div>
      <div class="ticket-footer">
        <span>
          ${ticket.data}
        </span>
      </div>
      ${actionButton}
      </div>
        <div class="ticket-comments">
          <div class="comments-list">
            ${comentariosHTML}
          </div>
      <div class="comment-form">
        <input
          type="text"
          class="comment-author"
           placeholder="Nome"
           maxlength="32"
         >
         <small class="comment-author-counter">
          0 / 32
        </small>
        <textarea
          class="comment-text"
          placeholder="Comentário"
          maxlength="4000"
        ></textarea>
        <small class="comment-text-counter">
          0 / 4000
        </small>
          <button
          class="add-comment-btn"
          data-ticket-id="${ticket.id}"
        >
          Enviar
          </button>
        </div>
        </div>
      </div>
    `;
    ticketsList.appendChild(ticketCard);
    ticketCard.addEventListener("click", (event) => {
      if (
        event.target.closest("button") ||
        event.target.closest("input") ||
        event.target.closest("textarea")
      ) {
        return;
      }
      if (ticketsExpandidos.has(ticket.id)) {
        ticketsExpandidos.delete(ticket.id);
      } else {
        ticketsExpandidos.add(ticket.id);
      }
      renderTickets();
    });
  });
  document.querySelectorAll(".expand-description-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const description = button.previousElementSibling;
      description.classList.toggle("collapsed");
      button.textContent = description.classList.contains("collapsed")
        ? "Ver mais"
        : "Ver menos";
    });
  });
  document.querySelectorAll(".ticket-card").forEach((card) => {
    const description = card.querySelector(".ticket-description");
    const button = card.querySelector(".expand-description-btn");
    if (description.scrollHeight <= 90) {
      button.style.display = "none";
    }
  });
  document.querySelectorAll(".add-comment-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const ticketId = Number(button.dataset.ticketId);
      const card = button.closest(".ticket-comments");
      const autor = card.querySelector(".comment-author").value.trim();
      const texto = card.querySelector(".comment-text").value.trim();
      if (autor.length > 32) {
        alert("Nome limitado a 32 caracteres.");
        return;
      }
      if (texto.length > 4000) {
        alert("Comentário limitado a 4000 caracteres.");
        return;
      }
      if (autor === "" || texto === "") {
        alert("Preencha nome e comentário.");
        return;
      }
      const ticket = chamados.find((chamado) => chamado.id === ticketId);
      if (!ticket.comentarios) {
        ticket.comentarios = [];
      }
      ticket.comentarios.push({
        autor,
        texto,
        data: new Date().toLocaleString("pt-BR"),
      });
      saveTickets();
      renderTickets();
    });
  });
  document.querySelectorAll(".comment-author").forEach((input) => {
    const counter = input.nextElementSibling;
    const update = () => {
      counter.textContent = `${input.value.length} / 32`;
    };
    input.addEventListener("input", update);
    update();
  });
  document.querySelectorAll(".comment-text").forEach((textarea) => {
    const counter = textarea.nextElementSibling;
    const update = () => {
      counter.textContent = `${textarea.value.length} / 4000`;
    };
    textarea.addEventListener("input", update);
    update();
  });
  document.querySelectorAll(".ticket-action-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const ticketId = Number(button.dataset.id);
      const action = button.dataset.action;
      const ticket = chamados.find((ticket) => ticket.id === ticketId);
      if (!ticket) return;
      switch (action) {
        case "start":
          ticket.status = "Em Progresso";
          break;
        case "pause":
          ticket.status = "Pausado";
          break;
        case "resume":
          ticket.status = "Em Progresso";
          break;
        case "finish":
          ticket.status = "Concluído";
          break;
        case "cancel":
          ticket.status = "Cancelado";
          break;
      }
      saveTickets();
      refreshUI();
    });
  });
}

ticketSearch.addEventListener("input", renderTickets);

topbarGroupSelect.addEventListener("change", renderTickets);

sortTickets.addEventListener("change", renderTickets);

statusFilter.addEventListener("change", renderTickets);

document.querySelector("#toggle-all-tickets").addEventListener("click", () => {
  if (todosExpandidos) {
    ticketsExpandidos.clear();
  } else {
    chamados.forEach((ticket) => ticketsExpandidos.add(ticket.id));
  }

  todosExpandidos = !todosExpandidos;

  document.querySelector("#toggle-all-tickets").textContent = todosExpandidos
    ? "Minimizar todos"
    : "Expandir todos";

  renderTickets();
});

renderGroups();
populateGroupSelects();
renderTickets();

setupCounter("#ticket-title", '[data-for="ticket-title"]');
setupCounter("#ticket-requester", '[data-for="ticket-requester"]');
setupCounter("#ticket-description", '[data-for="ticket-description"]');

// Submit grupo

groupForm.addEventListener("submit", (event) => {
  // impede reload da página
  event.preventDefault();
  // captura valores
  const groupName = document.querySelector("#group-name").value;
  const groupPrefix = document.querySelector("#group-prefix").value;
  const prefixRegex = /^[A-Z0-9]+$/;

  if (!prefixRegex.test(groupPrefix.toUpperCase())) {
    alert("O prefixo só pode conter letras e números.");

    return;
  }
  // validação
  if (groupName === "" || groupPrefix === "") {
    alert("Preencha todos os campos");
    return;
  }
  // validação de duplicados
  const normalizedName = groupName.trim().toLowerCase();

  const normalizedPrefix = groupPrefix.trim().toUpperCase();

  const groupExists = grupos.some((group) => {
    return (
      group.nome.toLowerCase() === normalizedName ||
      group.prefixo === normalizedPrefix
    );
  });
  if (groupExists) {
    alert("Já existe um grupo com este nome ou prefixo.");
    return;
  }
  // cria objeto
  const novoGrupo = {
    id: Date.now(),
    nome: groupName,
    prefixo: groupPrefix.toUpperCase(),
  };
  // adiciona no array
  grupos.push(novoGrupo);
  saveGroups();
  // renderiza novamente
  refreshUI();
  // limpa formulário
  groupForm.reset();
  // fecha modal
  groupModal.classList.add("hidden");
});

function saveGroups() {
  localStorage.setItem("groups", JSON.stringify(grupos));
}

function exportGroupCSV(grupoId) {
  const grupo = grupos.find((grupo) => grupo.id == grupoId);
  const ticketsGrupo = chamados.filter((ticket) => ticket.grupoId == grupoId);
  if (ticketsGrupo.length === 0) {
    alert("Este grupo não possui chamados.");
    return;
  }
  const linhas = [
    [
      "Codigo",
      "Titulo",
      "Solicitante",
      "Responsavel",
      "Criticidade",
      "Status",
      "Data",
      "Descricao",
    ],
  ];
  ticketsGrupo.forEach((ticket) => {
    linhas.push([
      ticket.codigo,
      ticket.titulo,
      ticket.solicitante,
      ticket.responsavel || "",
      ticket.criticidade,
      ticket.status,
      ticket.data,
      ticket.descricao.replaceAll("\n", " "),
    ]);
  });
  const csv = linhas
    .map((linha) => linha.map((valor) => `"${String(valor)}"`).join(";"))
    .join("\n");
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${grupo.prefixo}-chamados.csv`;
  link.click();
}

//Modal chamados

newTicketBtn.addEventListener("click", () => {
  if (grupos.length === 0) {
    alert("Crie um grupo antes de criar chamados.");
    return;
  }
  populateGroupSelects();
  ticketModal.classList.remove("hidden");
});

closeTicketModalBtn.addEventListener("click", () => {
  ticketModal.classList.add("hidden");
});

function populateGroupSelects() {
  const selectedValue = topbarGroupSelect.value;
  ticketGroupSelect.innerHTML = "";
  topbarGroupSelect.innerHTML = `
    <option value="all">
      Todos
    </option>
  `;
  grupos.forEach((grupo) => {
    const option = document.createElement("option");
    option.value = grupo.id;
    option.textContent = `${grupo.prefixo} - ${grupo.nome}`;
    ticketGroupSelect.appendChild(option.cloneNode(true));
    topbarGroupSelect.appendChild(option);
  });
  const optionExists = [...topbarGroupSelect.options].some(
    (option) => option.value === selectedValue,
  );
  topbarGroupSelect.value = optionExists ? selectedValue : "all";
}

//submit chamado

ticketForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const ticketGroup = document.querySelector("#ticket-group").value;
  const ticketDate = document.querySelector("#ticket-date").value;
  const ticketDescription = document.querySelector("#ticket-description").value;
  const ticketTitle = document.querySelector("#ticket-title").value;
  const ticketRequester = document.querySelector("#ticket-requester").value;
  const ticketPriority = document.querySelector("#ticket-priority").value;
  const ticketOwner = document.querySelector("#ticket-owner").value;
  // validação
  if (
    ticketTitle === "" ||
    ticketRequester === "" ||
    ticketDate === "" ||
    ticketDescription === "" ||
    ticketPriority === ""
  ) {
    alert("Preencha os campos obrigatórios.");
    return;
  }
  // encontra grupo
  const grupoSelecionado = grupos.find((grupo) => grupo.id == ticketGroup);
  // tickets do grupo
  const ticketsDoGrupo = chamados.filter(
    (ticket) => ticket.grupoId == ticketGroup,
  );
  // gera código
  const ticketCode = `${grupoSelecionado.prefixo}-${String(
    ticketsDoGrupo.length + 1,
  ).padStart(3, "0")}`;
  // objeto
  const novoChamado = {
    id: Date.now(),
    titulo: ticketTitle,
    codigo: ticketCode,
    grupoId: ticketGroup,
    solicitante: ticketRequester,
    data: ticketDate,
    descricao: ticketDescription,
    responsavel: ticketOwner,
    criticidade: ticketPriority,
    status: "Pendente",
    comentarios: [],
  };
  chamados.push(novoChamado);
  saveTickets();
  refreshUI();
  ticketForm.reset();
  ticketModal.classList.add("hidden");
});

function setupCounter(inputSelector, counterSelector) {
  const input = document.querySelector(inputSelector);
  const counter = document.querySelector(counterSelector);
  if (!input || !counter) {
    return;
  }
  const updateCounter = () => {
    counter.textContent = `${input.value.length} / ${input.maxLength}`;
  };
  input.addEventListener("input", updateCounter);
  updateCounter();
}

function saveTickets() {
  localStorage.setItem("tickets", JSON.stringify(chamados));
}

function refreshUI() {
  renderGroups();
  renderTickets();
}
