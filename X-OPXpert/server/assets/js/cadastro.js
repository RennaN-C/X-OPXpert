document.addEventListener("DOMContentLoaded", () => {
  const btnCadastrar = document.querySelector(".btn-cadastrar");

  btnCadastrar.addEventListener("click", async (event) => {
    event.preventDefault();

    
    const nome_completo = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const departamentoText = document
      .getElementById("departamento")
      .value.trim();
    const cargo = document.getElementById("cargo").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const data_admissao = document.getElementById("admissao").value;
    const gerente_responsavel = document.getElementById("gerente").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;

    
    if (
      !nome_completo ||
      !email ||
      !usuario ||
      !cpf ||
      !senha ||
      !confirmaSenha ||
      !departamentoText
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem.");
      return;
    }

 
    const departamentosMap = {
      TI: 1,
      RH: 2,
      Financeiro: 3,
      Vendas: 4,
      Marketing: 5,
    };

    const departamento_id = departamentosMap[departamentoText] || null;

    try {
      const response = await fetch("/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_completo,
          email,
          usuario,
          cpf,
          telefone,
          departamento_id,
          cargo,
          matricula,
          data_admissao,
          gerente_responsavel,
          senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.mensagem || "Cadastro realizado com sucesso!");
        window.location.href = "/login"; 
      } else {
        alert(data.mensagem || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error(error);
    }
  });
});
