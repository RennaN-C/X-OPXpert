const ctx = document.getElementById('graficoStatus').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Ordens Abertas', 'Em Produção', 'Concluídas'],
    datasets: [{
      data: [12, 8, 25],
      backgroundColor: ['#F55F29', '#D2388E', '#29F59F']
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    }
  }
});

// Evento do botão logout
document.getElementById('btnLogout').addEventListener('click', () => {
  fetch('/logout', { method: 'POST' })
    .then(res => {
      if (res.ok) {
        window.location.href = '/login';
      } else {
        alert('Erro ao fazer logout.');
      }
    })
    .catch(() => alert('Erro ao fazer logout.'));
});