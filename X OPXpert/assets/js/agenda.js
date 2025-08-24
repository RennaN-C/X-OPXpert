document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/agenda")
    .then((res) => res.json())
    .then((eventos) => {
      const tbody = document.getElementById("eventos-body");
      eventos.forEach((evento) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${evento.titulo}</td>
          <td>${evento.data_evento}</td>
          <td>${evento.hora_evento}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch((err) => {
      console.error("Erro ao buscar eventos:", err);
    });
});
