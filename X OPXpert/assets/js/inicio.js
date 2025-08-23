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