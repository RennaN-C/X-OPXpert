document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.querySelector(".btn-login");

  btnLogin.addEventListener("click", async (event) => {
    event.preventDefault(); 

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!usuario || !senha) {
      alert("Por favor, preencha usuário e senha.");
      return;
    }

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        
        window.location.href = "/inicio";
      } else {
        
        alert(data.mensagem || "Usuário ou senha inválidos.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error(error);
    }
  });
});
