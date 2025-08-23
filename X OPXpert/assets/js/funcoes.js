const pages = {
      dashboard: `<h1>📊 Dashboard</h1>
        <p>Visualização geral dos indicadores de produção (KPIs), gráficos, alertas e resumo das ordens.</p>
        <div class="functions">
          <button><span class="icon">📈</span> Visualização geral dos indicadores de produção (KPIs).</button>
          <button><span class="icon">📊</span> Gráficos de desempenho em tempo real.</button>
          <button><span class="icon">⚠️</span> Alertas de atrasos ou falhas no processo.</button>
          <button><span class="icon">📝</span> Resumo de ordens de produção ativas.</button>
          <button><span class="icon">⚙️</span> Status de máquinas e manutenção.</button>
        </div>`,
      producao: `<h1>🏭 Produção</h1>
        <p>Gerencie ordens, controle etapas e tempos, aponto produção e mais.</p>
        <div class="functions">
          <button><span class="icon">📋</span> Registro e acompanhamento das ordens de produção.</button>
          <button><span class="icon">⏱️</span> Controle de etapas e tempos de processo.</button>
          <button><span class="icon">📦</span> Apontamento de produção (quantidade produzida vs. planejada).</button>
          <button><span class="icon">🔄</span> Controle de retrabalho e perdas.</button>
          <button><span class="icon">🤖</span> Integração com máquinas e sensores (IoT).</button>
        </div>`,
      estoque: `<h1>📦 Estoque</h1>
        <p>Controle e monitoramento de materiais e produtos em estoque.</p>
        <div class="functions">
          <button><span class="icon">📥</span> Entrada e saída de materiais.</button>
          <button><span class="icon">🔢</span> Controle de níveis e reposição.</button>
          <button><span class="icon">🗂️</span> Inventário físico e ajustes.</button>
          <button><span class="icon">📊</span> Relatórios de movimentação.</button>
          <button><span class="icon">⚙️</span> Integração com sistemas ERP.</button>
        </div>`,
      relatorios: `<h1>📑 Relatórios</h1>
        <p>Geração e visualização de relatórios gerenciais.</p>
        <div class="functions">
          <button><span class="icon">📈</span> Relatórios de produção.</button>
          <button><span class="icon">📉</span> Análise de desempenho.</button>
          <button><span class="icon">🗂️</span> Exportação em PDF/Excel.</button>
          <button><span class="icon">📊</span> Personalização de relatórios.</button>
          <button><span class="icon">🔒</span> Controle de acesso e permissões.</button>
        </div>`,
      manutencao: `<h1>🛠 Manutenção</h1>
        <p>Gerenciamento da manutenção preventiva e corretiva.</p>
        <div class="functions">
          <button><span class="icon">🛎️</span> Agendamento de manutenções.</button>
          <button><span class="icon">⚙️</span> Controle de ordens de serviço.</button>
          <button><span class="icon">🔧</span> Histórico de intervenções.</button>
          <button><span class="icon">📅</span> Alertas de vencimentos.</button>
          <button><span class="icon">📋</span> Relatórios e análises.</button>
        </div>`,
      rh: `<h1>👥 Recursos Humanos</h1>
        <p>Gestão de colaboradores e processos de RH.</p>
        <div class="functions">
          <button><span class="icon">📋</span> Cadastro de funcionários.</button>
          <button><span class="icon">🕒</span> Controle de ponto e jornada.</button>
          <button><span class="icon">💼</span> Gestão de benefícios.</button>
          <button><span class="icon">📅</span> Agendamento de treinamentos.</button>
          <button><span class="icon">📈</span> Avaliações de desempenho.</button>
        </div>`,
      financeiro: `<h1>💰 Financeiro</h1>
        <p>Controle financeiro, fluxo de caixa e contas a pagar/receber.</p>
        <div class="functions">
          <button><span class="icon">💸</span> Controle de receitas e despesas.</button>
          <button><span class="icon">📅</span> Fluxo de caixa.</button>
          <button><span class="icon">📊</span> Relatórios financeiros.</button>
          <button><span class="icon">🔄</span> Integração bancária.</button>
          <button><span class="icon">📋</span> Gestão de contas a pagar e receber.</button>
        </div>`,
      agenda: `<h1>📅 Agenda</h1>
        <p>Organize compromissos, reuniões e prazos importantes.</p>
        <div class="functions">
          <button><span class="icon">📆</span> Calendário integrado.</button>
          <button><span class="icon">⏰</span> Alertas e notificações.</button>
          <button><span class="icon">📝</span> Notas e lembretes.</button>
          <button><span class="icon">👥</span> Compartilhamento com equipe.</button>
          <button><span class="icon">🔗</span> Integração com e-mail.</button>
        </div>`,
      configuracoes: ``
    };

    function openPage(page) {
      const container = document.getElementById('content-container');
      if (pages[page]) {
        container.innerHTML = pages[page];
        document.getElementById('page-wrapper').focus();
      } else {
        container.innerHTML = `<h1>Página não encontrada</h1>`;
      }
      document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
      });
    }

    openPage('dashboard');

    function toggleMenu() {
      document.querySelector('.sidebar').classList.toggle('active');
    }