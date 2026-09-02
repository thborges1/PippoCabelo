// Menu mobile: abre e fecha o menu ao clicar no botão hambúrguer
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Fecha o menu mobile automaticamente ao clicar em um link
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ================= STATUS AUTOMÁTICO DO SALÃO =================
// Segunda a sexta: 09:00 às 19:00
// Sábado: 09:00 às 17:00
// Domingo: fechado
function atualizarStatusSalao() {
  const badge = document.getElementById('statusBadge');
  const statusText = document.getElementById('statusText');

  if (!badge || !statusText) return;

  // Usa o horário oficial de Brasília/São Paulo.
  const partes = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date());

  const dia = (partes.find(p => p.type === 'weekday')?.value || '').toLowerCase();
  const hora = Number(partes.find(p => p.type === 'hour')?.value || 0);
  const minuto = Number(partes.find(p => p.type === 'minute')?.value || 0);

  const agoraEmMinutos = hora * 60 + minuto;
  const abertura = 9 * 60;
  let fechamento = null;

  if (
    dia.startsWith('seg') ||
    dia.startsWith('ter') ||
    dia.startsWith('qua') ||
    dia.startsWith('qui') ||
    dia.startsWith('sex')
  ) {
    fechamento = 19 * 60;
  } else if (dia.startsWith('sáb') || dia.startsWith('sab')) {
    fechamento = 17 * 60;
  }

  const aberto =
    fechamento !== null &&
    agoraEmMinutos >= abertura &&
    agoraEmMinutos < fechamento;

  badge.classList.toggle('is-open', aberto);
  badge.classList.toggle('is-closed', !aberto);
  statusText.textContent = aberto ? 'Aberto agora' : 'Fechado agora';
}

atualizarStatusSalao();
setInterval(atualizarStatusSalao, 60000);

