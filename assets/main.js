'use strict';
const toggle = document.querySelector('#circuit-toggle');
const board = document.querySelector('#board');
const status = document.querySelector('#circuit-status');
let powerCycles = 0;
if (toggle && board && status) {
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const powered = toggle.getAttribute('aria-pressed') !== 'true';
    toggle.setAttribute('aria-pressed', String(powered));
    board.classList.toggle('is-on', powered);
    toggle.innerHTML = `${powered ? 'Desligar' : 'Ligar circuito'} <span aria-hidden="true">⏻</span>`;
    if (powered) powerCycles++;
    status.textContent = powered
      ? (powerCycles >= 3 ? 'Já desligou e ligou. Agora pode chamar o técnico.' : 'Conexão feita. A curiosidade segue ligada.')
      : 'Uma ideia começa com uma conexão.';
  });
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Nem tudo que está escondido é um parafuso embaixo da etiqueta.
const dialog = document.querySelector('#secret-dialog');
const secretTitle = document.querySelector('#secret-title');
const secretMessage = document.querySelector('#secret-message');
function reveal(title, message) {
  if (!dialog || dialog.open) return;
  document.querySelector('#secret-terminal').hidden = true;
  secretTitle.textContent = title;
  secretMessage.textContent = message;
  dialog.showModal();
}
document.querySelector('#secret-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
const chip = document.querySelector('#chip-secret');
if (chip) {
  chip.hidden = false;
  chip.addEventListener('click', openTerminal);
}
const coffee = document.querySelector('#coffee-secret');
const coffeeLines = [
  ['Fonte de alimentação detectada.', 'Entrada: café. Saída: código e diagnóstico. Rendimento: depende de quem passou o café. Não confundir com refrigeração líquida.'],
  ['Overclock de bancada.', 'Segunda dose recebida. O técnico agora escuta capacitor pensando. Brincadeira: ainda precisa do multímetro.'],
  ['Calma, isso aqui não é uma cafeteira.', 'Café suficiente para compilar as ideias. Mais uma dose e quem vai precisar de manutenção preventiva sou eu.']
];
let coffees = 0;
if (coffee) {
  coffee.hidden = false;
  document.querySelector('#coffee-static').hidden = true;
  coffee.addEventListener('click', () => {
    const [title, message] = coffeeLines[Math.min(coffees++, coffeeLines.length - 1)];
    reveal(title, message);
  });
}
// Continue? Quem sabe, sabe. O terminal também abre por toque no chip.
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let sequence = 0;
let lastKey = 0;
document.addEventListener('keydown', (event) => {
  if (dialog?.open || event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.target instanceof HTMLElement && (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))) return;
  if (Date.now() - lastKey > 3000) sequence = 0;
  lastKey = Date.now();
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  sequence = key === konami[sequence] ? sequence + 1 : (key === konami[0] ? 1 : 0);
  if (sequence === konami.length) {
    sequence = 0;
    openTerminal();
    terminalLine('CHEAT ACEITO: 30 vidas. Nenhum HDMI extra. O chefão final continua sendo o defeito intermitente.');
  }
});
console.info('%c CIA. DO CIRCUITO // BANCADA SECRETA ', 'background:#243d32;color:#d0ed9f;padding:8px;font-weight:bold');
console.info('Abriu o console? Já pode segurar a lanterna. Só não perde os parafusos.\nDigite bancada() para abrir o terminal secreto. Ou vá de ↑ ↑ ↓ ↓ ← → ← → B A.');

const terminal = document.querySelector('#secret-terminal');
const terminalOutput = document.querySelector('#terminal-output');
const terminalInput = document.querySelector('#terminal-command');
const reports = [
  'RELATÓRIO DE INTERMITÊNCIA\n47 minutos de teste: perfeito.\nCliente estacionou: falhou.\nConclusão: a placa tem acesso à câmera da recepção.',
  'ANÁLISE DE FUMAÇA MÁGICA\nComponente: liberou a alma.\nDatasheet: não prevê ressurreição.\nConduta: substituir o componente. Exorcismo não vem no orçamento.',
  'RASTREAMENTO DE PARAFUSO\nNa bancada: não. No chão: não.\nProbabilidade de reaparecer depois de fechar a carcaça: 100%.\nEstado atual: superposição quântica de Philips.',
  'LAUDO DO “É SÓ UM FIOZINHO”\nMicroscópio: ligado. Esquema: aberto.\nPostura do técnico: camarão.\nO fiozinho: 0,2 mm, embaixo de um BGA, fazendo cosplay de problema simples.',
  'STATUS DO DEPLOY\nNa minha máquina: funciona.\nEm produção: desenvolveu personalidade própria.\nSexta-feira, 17h59: excelente horário para ir embora sem tocar em nada.',
  'INSPEÇÃO DE PLACA\nOxidação: ecossistema consolidado.\nUmidade relatada: “nunca molhou”.\nPróximo passo: descobrir se precisa de microsolda ou de um agrônomo.'
];
let reportIndex = 0;
function terminalLine(text) {
  const line = document.createElement('p');
  line.textContent = text;
  terminalOutput.append(line);
  while (terminalOutput.children.length > 24) terminalOutput.firstElementChild.remove();
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}
function openTerminal() {
  if (dialog.open) return;
  reveal('Terminal de bancada.', 'Simulação recreativa. O único sistema em risco aqui é o meu senso de humor.');
  terminal.hidden = false;
  terminalOutput.replaceChildren();
  terminalLine('TS-OS v1.0 — boot concluído.\nFumaça mágica: contida. Café: sob investigação.\nDigite ajuda para explorar.');
  terminalInput.value = '';
  terminalInput.focus({ preventScroll: true });
}
document.querySelector('#terminal-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const raw = terminalInput.value.trim();
  const command = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (!command) return;
  terminalInput.value = '';
  terminalLine('> ' + raw);
  const replies = {
    ajuda: 'Comandos: diagnostico · status · cafe · dns · ping · sudo · 42 · limpar · sair',
    status: 'Hardware: resistindo. Software: insistindo.\nTécnico: em modo economia de paciência.\nPendência crítica: descobrir quem pegou a pinça.',
    cafe: 'USB-C: incompatível. ATX: incompatível.\nCaneca: reconhecida.\nTécnico recarregado. Autonomia estimada: até o próximo “parou do nada”.',
    dns: 'Resolvendo culpado...\nÉ o DNS. Mesmo quando não é o DNS, era o cache do DNS.\nA placa nem tem rede? Encaminhar ao departamento de mistérios.',
    ping: 'PONG. TTL=42.\nLatência do servidor: 1 ms.\nLatência de quem foi buscar o componente na gaveta: indeterminada.',
    sudo: 'Permissão negada.\nVocê não está no grupo dos que devolvem a ferramenta no lugar. Este incidente será lembrado no próximo café.',
    '42': 'Resposta para a vida, o universo e tudo mais: 42.\nResposta para “quanto fica o conserto?”: primeiro, o diagnóstico.'
  };
  if (command === 'sair') dialog.close();
  else if (command === 'limpar' || command === 'clear') terminalOutput.replaceChildren();
  else if (command === 'diagnostico') terminalLine(reports[reportIndex++ % reports.length]);
  else terminalLine(replies[command] || 'Comando não encontrado. Já tentou desligar e... deixa pra lá. Digite ajuda.');
});
// Atalho intencional de DevTools; não executa comandos reais nem faz requisições.
window.bancada = openTerminal;
