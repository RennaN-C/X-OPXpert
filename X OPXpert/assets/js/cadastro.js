function validarCadastro() {
  const senha = document.getElementById("senha").value;
  const confirma = document.getElementById("confirmaSenha").value;

  if (senha !== confirma) {
    alert("As senhas não coincidem!");
    return;
  }

  alert("Cadastro realizado com sucesso!");
  window.location.href = "/login";
}
