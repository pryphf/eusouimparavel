
/* ── PWA — Service Worker + Install Prompt ──── */
let deferredPrompt = null;

// Registra o Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registrado:', reg.scope))
      .catch(err => console.log('SW erro:', err));
  });
}

// Captura o evento de instalação
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Mostra o banner de instalação discreto
  const banner = document.getElementById('pwa-banner');
  if (banner) banner.classList.remove('pwa-hidden');
});

// Botão de instalar
function instalarPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choice => {
    deferredPrompt = null;
    const banner = document.getElementById('pwa-banner');
    if (banner) banner.classList.add('pwa-hidden');
  });
}

// Esconde o banner se já instalado
window.addEventListener('appinstalled', () => {
  const banner = document.getElementById('pwa-banner');
  if (banner) banner.classList.add('pwa-hidden');
});


/* ── DADOS ─────────────────────────────── */
const LICOES = [
  { num:1, cat:'Mentalidade', titulo:'Atitude Mental Positiva', abertura:'Você não controla tudo o que acontece. Mas controla o significado que dá ao que acontece.', icon:'🌅',
    ensina:'Pessoas otimistas não vivem uma vida mais fácil. Elas interpretam as experiências de forma mais <em>útil</em>. O significado que você atribui a cada situação molda completamente sua realidade.',
    exercicios:['Anote uma situação difícil que viveu recentemente.','Escreva sua interpretação automática sobre ela.','Agora reescreva: qual aprendizado ou oportunidade existe aqui?','Repita esse exercício todos os dias por 7 dias.'],
    reflexao:'Qual situação recente você está interpretando de forma limitante? Como poderia reinterpretar com mais compaixão e inteligência?',
    frase:'O significado que você dá ao que acontece<br>é o seu <em>verdadeiro poder</em>.',
    celeb:'"Uma nova interpretação é o começo de uma nova vida."' },

  { num:2, cat:'Pensamentos', titulo:'Pare de Alimentar Pensamentos Negativos', abertura:'O cérebro fortalece aquilo que você repete.', icon:'🧠',
    ensina:'Se você repete "está difícil", seu cérebro procura <em>provas</em>. Se você repete "vou descobrir um caminho", seu cérebro procura <em>soluções</em>. A neuroplasticidade é real — e você está no controle.',
    exercicios:['Sempre que se pegar reclamando, responda imediatamente:','"O que eu posso fazer a respeito agora?"','Anote essa pergunta como lembrete no celular.','Pratique por 30 dias consecutivos.'],
    reflexao:'Qual pensamento negativo você mais repete? Escreva a versão transformada dele — a que te serve.',
    frase:'Onde a atenção vai,<br><em>a energia flui</em>.',
    celeb:'"Você acabou de interromper um padrão antigo. Isso é extraordinário."' },

  { num:3, cat:'Otimismo', titulo:'Seja uma Otimista Inabalável', abertura:'Otimismo não é ignorar problemas. É acreditar que você consegue lidar com eles.', icon:'☀️',
    ensina:'Otimismo não é ingenuidade — é uma <em>estratégia</em>. Pessoas otimistas resolvem mais porque acreditam que os problemas têm solução. Essa crença muda o que o cérebro busca.',
    exercicios:['Liste 5 dificuldades atuais da sua vida.','Para cada uma, escreva: "O que isso está me ensinando?"','Identifique uma oportunidade escondida em cada desafio.','Guarde essa lista e releia em 30 dias.'],
    reflexao:'Qual é sua maior dificuldade agora? O que ela está te ensinando que você ainda não reconheceu?',
    frase:'Seu futuro está escondido nas decisões<br>que <em>você adia hoje</em>.',
    celeb:'"Cada dificuldade que você nomeou hoje perdeu um pouco do poder sobre você."' },

  { num:4, cat:'Confiança', titulo:'Desenvolva Autoconfiança', abertura:'Confiança não nasce antes da ação. Nasce depois da ação.', icon:'💪',
    ensina:'A maioria das pessoas espera sentir confiança para agir. Mas a confiança é construída pela <em>ação</em>, não o contrário. Cada pequena promessa cumprida é um tijolo dessa fundação.',
    exercicios:['Defina uma promessa simples para hoje.','Opções: 15 min de caminhada, 20 min de estudo, 1 conteúdo publicado.','Cumpra antes de dormir — sem negociar.','Registre: "Hoje eu cumpri _______________."'],
    reflexao:'Qual promessa simples você pode fazer a si mesma e cumprir HOJE? Seja específica.',
    frase:'Pequenas vitórias<br>constroem <em>identidade</em>.',
    celeb:'"Hoje você provou para si mesma que pode confiar em si. Isso vale tudo."' },

  { num:5, cat:'Integridade', titulo:'Integridade Absoluta', abertura:'Ser íntegra é alinhar pensamento, palavra e ação.', icon:'🌿',
    ensina:'A incoerência drena energia silenciosamente. Quando você diz uma coisa e faz outra, parte de você sabe. Essa dissonância cria cansaço, culpa e paralisia. <em>Integridade é libertação.</em>',
    exercicios:['Complete ao menos 3 vezes com honestidade total:','"Eu digo que quero _____, mas continuo fazendo _____."','Para cada resposta: é medo, hábito ou falta de decisão?','Escolha uma incoerência para resolver ainda hoje.'],
    reflexao:'Em que área da sua vida você está sendo mais incoerente? O que essa incoerência está custando silenciosamente?',
    frase:'A mudança começa no momento em que você<br>para de <em>negociar consigo mesma</em>.',
    celeb:'"Você se viu com honestidade hoje. Isso é o começo de tudo."' },

  { num:6, cat:'Verdade', titulo:'Fale a Verdade Para Si Mesma', abertura:'A verdade liberta energia. Desculpas drenam energia.', icon:'🔮',
    ensina:'Desculpas parecem protetoras, mas são prisões. Quando você diz "não tenho tempo", está ocultando a verdade: <em>"não estou priorizando"</em>. Essa distinção é radical — e poderosa.',
    exercicios:['Liste suas 3 desculpas mais usadas.','Transforme cada uma em verdade.','Leia as verdades em voz alta — sem julgamento.','Escolha uma ação concreta para cada verdade.'],
    reflexao:'Qual é a desculpa que você mais usa? Qual é a verdade honesta por trás dela?',
    frase:'Disciplina é<br><em>amor-próprio em movimento</em>.',
    celeb:'"A verdade que você disse hoje tem mais valor do que mil planos não executados."' },

  { num:7, cat:'Paz Interior', titulo:'Faça da Paz Mental Sua Prioridade', abertura:'Nada vale o preço da sua paz.', icon:'🕊️',
    ensina:'Paz não é ausência de conflito. É coerência interna. Quando você age contra seus valores, a paz desaparece. Quando você age <em>a partir</em> de quem você é, a paz se torna a base.',
    exercicios:['Divida uma folha: "Me dá paz" e "Rouba minha paz".','Liste pelo menos 5 itens em cada lado.','Identifique o maior ladrão de paz da sua vida agora.','Defina UMA ação para reduzir ou eliminar esse ladrão.'],
    reflexao:'O que está roubando sua paz agora? O que você pode fazer a respeito — ainda hoje?',
    frase:'Paz não é ausência de conflito.<br>É a coragem de se <em>manter coerente</em>.',
    celeb:'"Você priorizou sua paz hoje. Essa é a base de tudo o que virá."' },

  { num:8, cat:'Execução', titulo:'Velocidade de Execução', abertura:'O mercado recompensa quem age. Não quem planeja infinitamente.', icon:'⚡',
    ensina:'Planejamento sem execução é sonho. O excesso de planejamento muitas vezes é medo disfarçado de organização. A <em>Regra dos 5 Minutos</em> corta o ciclo da procrastinação antes que ele comece.',
    exercicios:['Esta semana: se uma tarefa levar menos de 5 minutos, execute imediatamente.','Sem adiar. Sem "vou fazer depois". Agora.','Anote quantas tarefas você eliminou assim ao final do dia.','Observe a leveza que isso cria.'],
    reflexao:'Quais tarefas pequenas estão acumulando na sua lista? Liste 3 e execute agora mesmo.',
    frase:'Você não precisa de motivação.<br><em>Precisa de decisão.</em>',
    celeb:'"Ação imperfeita supera planejamento perfeito. Você comprovou isso hoje."' },

  { num:9, cat:'Urgência', titulo:'Senso de Urgência', abertura:'A vida muda rapidamente. Oportunidades têm prazo.', icon:'⏳',
    ensina:'A procrastinação trabalha com a ilusão de que "depois é sempre possível". Mas o tempo não volta. A meta parada há meses está <em>custando algo</em> — mesmo em silêncio.',
    exercicios:['Escolha uma meta parada há mais de 30 dias.','Pergunte: "O que posso fazer nas próximas 24 horas?"','Escreva a ação específica abaixo.','Execute antes de dormir hoje — sem exceção.'],
    reflexao:'Qual meta parada está custando mais caro para você agora? O que faria se soubesse que só tinha 24h?',
    frase:'A colheita pertence a quem teve coragem<br>de <em>continuar regando quando não via crescimento</em>.',
    celeb:'"Você reativou algo que estava dormindo. O movimento começou."' },

  { num:10, cat:'Foco', titulo:'Concentre-se em Uma Coisa', abertura:'O foco gera poder. A dispersão gera cansaço.', icon:'🎯',
    ensina:'Fazer tudo ao mesmo tempo é a forma mais sofisticada de não fazer nada. O <em>foco em uma única meta</em> — por vez — é o segredo das pessoas que realmente entregam resultados.',
    exercicios:['Escreva todas as metas que você está perseguindo agora.','Escolha UMA que, se alcançada, melhora tudo o mais.','Declare: "Minha única meta pelos próximos 90 dias é ___."','Coloque isso como lembrete visível.'],
    reflexao:'Se você pudesse alcançar apenas UMA meta nos próximos 90 dias, qual seria? Por quê essa?',
    frase:'O foco é a forma mais rara de<br><em>respeito ao seu próprio tempo</em>.',
    celeb:'"Clareza é poder. Você acabou de escolher seu próximo destino."' },

  { num:11, cat:'Aprendizado', titulo:'Aprenda com os Fracassos', abertura:'Fracasso não é o oposto do sucesso. É parte do processo.', icon:'🔥',
    ensina:'O medo do fracasso é o maior gerador de procrastinação. Quando você ressignifica o fracasso como <em>dado de aprendizado</em>, a ação se torna menos ameaçadora — e o crescimento acelera.',
    exercicios:['Liste seus 3 maiores "fracassos" dos últimos anos.','Para cada um: "O que aprendi?" e "Como isso me tornou mais forte?"','Identifique um padrão nos seus aprendizados.','Escreva o que nunca teria aprendido sem essas experiências.'],
    reflexao:'Qual fracasso ainda te pesa? O que ele te ensinou que você ainda não reconheceu completamente?',
    frase:'Cada erro foi uma aula.<br><em>A questão é: você estava presente para aprender?</em>',
    celeb:'"Você transformou dor em sabedoria hoje. Isso é alquimia real."' },

  { num:12, cat:'Coragem', titulo:'Coragem Para Agir Mesmo com Medo', abertura:'Coragem não é ausência de medo. É ação apesar do medo.', icon:'🦁',
    ensina:'Esperar o medo passar antes de agir é esperar para sempre. O medo não desaparece antes da ação — ele <em>encolhe durante a ação</em>. Coragem não é um sentimento. É uma escolha.',
    exercicios:['Escreva: "O que eu faria se tivesse certeza de que daria certo?"','Liste pelo menos 3 respostas sem filtrar.','Escolha a mais assustadora.','Dê um pequeno passo em direção a ela ainda hoje.'],
    reflexao:'O que você está adiando por medo? Qual seria o pior cenário real — e você conseguiria lidar com isso?',
    frase:'A coragem não é ausência do medo.<br>É a decisão de que <em>algo é mais importante</em> do que ele.',
    celeb:'"Você escolheu agir apesar do medo. Isso já te coloca no 1% das pessoas."' },

  { num:13, cat:'Persistência', titulo:'Persistência', abertura:'A maioria das pessoas desiste no intervalo entre plantar e colher.', icon:'🌱',
    ensina:'O período entre o início e os resultados é o mais perigoso. É onde a maioria desiste — não porque o caminho era errado, mas porque os <em>resultados demoraram</em>. Persistência é confiar no processo antes de ver a colheita.',
    exercicios:['Escolha algo importante que você abandonou.','Responda: abandonei porque era impossível — ou porque demorou?','Se foi por demora: o que te fez desistir no momento exato?','Se ainda vale: defina quando retoma.'],
    reflexao:'O que você abandonou que ainda faz sentido retomar? O que você precisa para não desistir dessa vez?',
    frase:'A colheita pertence a quem teve coragem<br>de <em>continuar regando quando não via crescimento</em>.',
    celeb:'"Você está no dia 13. Isso é persistência real. A maioria já desistiu."' },

  { num:14, cat:'Responsabilidade', titulo:'A Regra da Responsabilidade', abertura:'Assumir responsabilidade devolve poder.', icon:'⚖️',
    ensina:'Enquanto houver culpa externa, haverá impotência. Quando você assume responsabilidade — não como punição, mas como <em>fonte de poder</em> — você recupera o leme da própria vida.',
    exercicios:['Liste seus 3 maiores problemas atuais.','Para cada um: "Qual é MINHA parcela de responsabilidade?"','Escreva: "O que depende exclusivamente de mim?"','Defina uma ação concreta para cada um.'],
    reflexao:'Em qual situação você está culpando algo externo — e qual é a sua parte real nisso?',
    frase:'Assumir responsabilidade não é se punir.<br>É <em>recuperar o seu poder</em>.',
    celeb:'"14 dias. 14 princípios. Você chegou até aqui. Isso diz tudo sobre quem você é."' },
];

const FRASES_DIA = [
  'A procrastinação não rouba apenas tempo. Ela rouba versões inteiras de quem você poderia ser.',
  'O significado que você dá ao que acontece é o seu verdadeiro poder.',
  'Seu futuro está escondido nas decisões que você adia hoje.',
  'A mudança começa no momento em que você para de negociar consigo mesma.',
  'Disciplina é amor-próprio em movimento.',
  'Paz não é ausência de conflito. É a coragem de se manter coerente.',
  'Você não precisa de motivação. Precisa de decisão.',
  'A colheita pertence a quem continuou regando quando não via crescimento.',
  'Foco é a forma mais rara de respeito ao seu próprio tempo.',
  'Cada erro foi uma aula. A questão é: você estava presente para aprender?',
  'Coragem não é ausência de medo. É ação apesar do medo.',
  'A maioria desiste no intervalo entre plantar e colher.',
  'Assumir responsabilidade não é se punir. É recuperar o seu poder.',
  'Há mais de 5 anos ajudando você a se ajudar.',
];

/* ── ESTADO ─────────────────────────────── */
let ST = { nome:'', feitos:[], reflexoes:{} };

function salvar() { try { localStorage.setItem('jprog14', JSON.stringify(ST)); } catch(e){} }
function carregar() { try { const d = localStorage.getItem('jprog14'); if(d) ST = JSON.parse(d); } catch(e){} }

/* ── TELAS ──────────────────────────────── */
function show(id) {
  document.querySelectorAll('.screen').forEach(s => { s.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

/* ── INÍCIO ─────────────────────────────── */
function comecar() {
  const nome = document.getElementById('input-nome').value.trim();
  if (!nome) {
    document.getElementById('input-nome').focus();
    document.getElementById('input-nome').style.borderColor = 'rgba(184,150,90,0.5)';
    return;
  }
  ST.nome = nome;
  salvar();
  renderDash();
  show('dashboard');
}

/* ── DASHBOARD ──────────────────────────── */
function renderDash() {
  const feitos = ST.feitos.length;
  const proximo = feitos + 1;
  const pct = Math.round((feitos / 14) * 100);

  document.getElementById('dash-nome').textContent = ST.nome.split(' ')[0];
  document.getElementById('dash-dia-label').textContent = `Etapa ${feitos} de 14`;
  document.getElementById('progress-bar').style.width = `${pct}%`;
  document.getElementById('prog-pct').textContent = `${pct}% concluído`;
  document.getElementById('prog-restam').textContent = `${14 - feitos} etapas restantes`;
  document.getElementById('dash-subtitulo').textContent =
    feitos === 0 ? 'Sua jornada começa hoje.' :
    feitos === 14 ? 'Programa completo. Você é imparável.' :
    `${14 - feitos} etapas restantes. Você está construindo algo real.`;

  document.getElementById('streak-num').textContent = calcStreak();
  document.getElementById('proximo-dia').textContent = proximo <= 14 ? `Etapa ${proximo}` : '✓ Completo';

  const fi = Math.min(feitos, FRASES_DIA.length - 1);
  document.getElementById('frase-dash').textContent = `"${FRASES_DIA[fi]}"`;

  // grade
  const grade = document.getElementById('grade-dias');
  grade.innerHTML = '';
  // SVG icons for each lesson
  const ICONES_SVG = {
    1:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    2:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    3:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    4:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    5:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M12 3v18M3 8l9-5 9 5M5 11l-2 6h4l-2-6zM19 11l-2 6h4l-2-6z"/></svg>',
    6:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>',
    7:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.34A1 1 0 0 0 5 21C8.19 19.74 16.5 16 19 8c0 0-5 0-5 5"/><path d="M3.82 19.34C3.82 19.34 9 18 12 15"/></svg>',
    8:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    9:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    10: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    11: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M12 2c0 0-6 4.5-6 10a6 6 0 0 0 12 0c0-3-2-5.5-3-7-1 2-3 3-3 7"/></svg>',
    12: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>',
    13: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M12 22V12M12 12C12 7 8 4 3 3c0 5 3 9 9 9zM12 12c0-5 4-8 9-9-1 5-4 9-9 9"/></svg>',
    14: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  };
  const LOCK_SVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
  const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  LICOES.forEach((l, i) => {
    const dia   = i + 1;
    const feito = ST.feitos.includes(dia);
    const atual = dia === proximo;
    const bloq  = !feito && !atual;

    const el = document.createElement('div');
    el.className = `dia-card etapa-card ${feito ? 'feito' : atual ? 'atual' : 'bloqueado'}`;

    el.innerHTML = `
      <div class="etapa-icon-wrap ${feito ? 'icon-feito' : bloq ? 'icon-bloq' : 'icon-atual'}">
        ${bloq ? LOCK_SVG : ICONES_SVG[dia]}
      </div>
      <div class="etapa-label">Etapa ${dia}</div>
      <div class="etapa-nome">${l.titulo}</div>
      ${feito ? `<div class="etapa-concluido"><span class="etapa-check">${CHECK_SVG}</span> Concluída</div>` : ''}
    `;

    if (!bloq) el.onclick = () => abrirDia(dia);
    grade.appendChild(el);
  });
}

function calcStreak() {
  const s = [...ST.feitos].sort((a,b)=>a-b);
  if (!s.length) return 0;
  let streak = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (i === s.length - 1 || s[i] + 1 === s[i+1]) streak++;
    else break;
  }
  return streak;
}

/* ── DIA / LIÇÃO ────────────────────────── */
let diaAberto = null;

function abrirDia(num) {
  diaAberto = num;
  const l = LICOES[num - 1];
  const jaFeito = ST.feitos.includes(num);

  document.getElementById('dia-ghost').textContent = String(num).padStart(2,'0');
  document.getElementById('dia-categoria').textContent = `Etapa ${num} · ${l.cat}`;
  document.getElementById('dia-titulo').textContent = l.titulo;
  document.getElementById('dia-abertura').textContent = l.abertura;

  const corpo = document.getElementById('dia-corpo');
  const ref = ST.reflexoes[num] || '';

  corpo.innerHTML = `
    <div class="bloco">
      <div class="bloco-rotulo">O Ensinamento</div>
      <p class="ensinamento-principal">${l.ensina}</p>
    </div>

    <div class="frase-destaque-bloco">
      <div class="frase-destaque-aspas">"</div>
      <div class="frase-destaque-txt">${l.frase}</div>
    </div>

    <div class="bloco">
      <div class="bloco-rotulo terra">Exercício de hoje</div>
      <div class="exerc-lista">
        ${l.exercicios.map(e => `
          <div class="exerc-linha">
            <div class="exerc-bullet"></div>
            <div class="exerc-txt">${e}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="bloco">
      <div class="bloco-rotulo ouro">Reflexão</div>
      <p class="reflexao-pergunta">${l.reflexao}</p>
      <textarea class="reflexao-area" id="ref-area"
        placeholder="Escreva aqui, com calma e honestidade..."
        rows="4">${ref}</textarea>
    </div>

    <button class="btn-concluir" id="btn-concluir"
      onclick="concluirDia()" ${jaFeito ? 'disabled' : ''}>
      ${jaFeito ? '✓  Etapa concluída' : `Concluir etapa ${num}`}
    </button>
    ${jaFeito ? '<p class="concluido-nota">Avance para o próximo dia no início.</p>' : ''}
  `;

  document.getElementById('ref-area').addEventListener('input', e => {
    ST.reflexoes[num] = e.target.value;
    salvar();
  });

  show('dia-screen');
}

function concluirDia() {
  if (!ST.feitos.includes(diaAberto)) {
    ST.feitos.push(diaAberto);
    salvar();
  }
  const l = LICOES[diaAberto - 1];
  const icons = ['✨','🌸','💫','🌿','🔥','☀️','🕊️','⚡','⏳','🎯','🔮','🦁','🌱','⚖️'];

  document.getElementById('celeb-icon').textContent = icons[diaAberto - 1];
  document.getElementById('celeb-titulo').innerHTML = `Etapa <em>${diaAberto}</em> concluída.`;
  document.getElementById('celeb-sub').textContent =
    diaAberto < 14
      ? `${14 - diaAberto} etapas restantes. Você está construindo algo poderoso.`
      : 'Você completou os 14 dias. Isso é extraordinário.';
  document.getElementById('celeb-frase').textContent = l.celeb;

  show(diaAberto === 14 ? 'completo' : 'celebracao');
}

function voltarDash() { renderDash(); show('dashboard'); }
function abrirCTA() { window.open('https://jardimdapriluz.com.br', '_blank'); }
function reiniciar() { ST.feitos = []; ST.reflexoes = {}; salvar(); renderDash(); show('dashboard'); }


/* ── SENHA ──────────────────────────────── */
const SENHA_CORRETA = 'xp0626';

function verificarSenha() {
  const input = document.getElementById('senha-input');
  const erro  = document.getElementById('senha-erro');
  const val   = input.value.trim();

  if (val === SENHA_CORRETA) {
    // acesso liberado — vai para intro (ou dashboard se já logada antes)
    input.classList.remove('erro');
    erro.classList.add('invisivel');
    carregar();
    if (ST.nome) {
      renderDash();
      show('dashboard');
    } else {
      show('intro');
    }
  } else {
    // senha errada
    input.classList.add('erro');
    erro.classList.remove('invisivel');
    input.value = '';
    input.focus();
    // remove classe erro após animação
    setTimeout(() => input.classList.remove('erro'), 500);
  }
}

function toggleSenha() {
  const input = document.getElementById('senha-input');
  const btn   = document.querySelector('.senha-toggle');
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}

/* ── INIT ───────────────────────────────── */
// A tela de senha já está ativa por padrão.
// O usuário só avança após digitar a senha correta.
// Nada a fazer no init.