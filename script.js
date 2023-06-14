// Armazenamento dos agendamentos em memória
let agendamentos = [];
let dadosContato = {};

// Função para adicionar um agendamento
function adicionarAgendamento(servico, data, hora) {
  agendamentos.push({ servico, data, hora, ...dadosContato });
  console.log('Agendamento adicionado:', {
    servico,
    data,
    hora,
    ...dadosContato,
  });
  alert('Agendado com sucesso!');
}

// Função para salvar os dados de contato
function salvarDadosContato(nome, telefone) {
  dadosContato = { nome, telefone };
  console.log('Dados de contato salvos:', dadosContato);
}

// Função para verificar se uma data está dentro do limite de alteração
function verificarLimiteAlteracao(data) {
  let hoje = new Date();
  let limiteAlteracao = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate() + 2,
  );

  return new Date(data) >= limiteAlteracao;
}

// Função para alterar um agendamento existente
function alterarAgendamento(indice, novaData, novaHora) {
  const agendamento = agendamentos[indice];

  if (verificarLimiteAlteracao(agendamento.data)) {
    agendamento.data = novaData;
    agendamento.hora = novaHora;
    console.log('Agendamento alterado:', agendamento);
    alert('Alteração feita com sucesso!');
  } else {
    alert('A alteração só pode ser feita por telefone.');
  }
}

// Função para exibir os agendamentos existentes
function exibirAgendamentos() {
  const agendamentoSelect = document.getElementById('agendamento');

  // Limpar opções existentes
  agendamentoSelect.innerHTML = '';

  // Preencher opções com os agendamentos
  agendamentos.forEach((agendamento, indice) => {
    const option = document.createElement('option');
    option.value = indice;
    option.text = `Serviço: ${agendamento.servico} - Data: ${agendamento.data} - Hora: ${agendamento.hora}`;
    agendamentoSelect.appendChild(option);
  });
}

// Manipular submissão do formulário de agendamento
document
  .getElementById('agendamentoForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    adicionarAgendamento(servico, data, hora);
    exibirAgendamentos();
  });

// Manipular submissão do formulário de alteração
document
  .getElementById('alteracaoForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const indice = document.getElementById('agendamento').value;
    const novaData = document.getElementById('novaData').value;
    const novaHora = document.getElementById('novaHora').value;

    alterarAgendamento(indice, novaData, novaHora);
    exibirAgendamentos();
  });

// Inicializar exibição dos agendamentos
exibirAgendamentos();
