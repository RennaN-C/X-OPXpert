// models/init-models.js - VERSÃO REORDENADA (CORRIGIDA)
var DataTypes = require("sequelize").DataTypes;

// --- NÍVEL 0: Tabelas que não dependem de nada ---
var _clientes = require("./clientes");
var _departamentos = require("./departamentos"); // MOVIMENTEI PARA CIMA
var _fornecedores = require("./fornecedores");
var _produtos = require("./produtos");
var _manutencoes = require("./manutencoes");
var _permissoes = require("./permissoes");
var _financeiro = require("./financeiro");

// --- NÍVEL 1: Tabelas que dependem do Nível 0 ---
var _usuarios = require("./usuarios"); // Depende de 'departamentos'
var _funcionarios = require("./funcionarios"); // Depende de 'departamentos'
var _pedidos_compra = require("./pedidos_compra"); // Depende de 'fornecedores'
var _movimentacoes_estoque = require("./movimentacoes_estoque"); // Depende de 'produtos'
var _ordens_servico = require("./ordens_servico"); // Depende de 'manutencoes'

// --- NÍVEL 2: Tabelas que dependem do Nível 1 ---
var _agenda = require("./agenda"); // Depende de 'usuarios'
var _ponto = require("./ponto"); // Depende de 'funcionarios'
var _relatorios = require("./relatorios"); // Depende de 'usuarios'
var _usuario_permissoes = require("./usuario_permissoes"); // Depende de 'usuarios', 'permissoes'
var _ordens_producao = require("./ordens_producao"); // Depende de 'usuarios', 'clientes'

// --- NÍVEL 3: Tabelas que dependem do Nível 2 ---
var _etapas_producao = require("./etapas_producao"); // Depende de 'ordens_producao'
var _qualidade = require("./qualidade"); // Depende de 'ordens_producao'


function initModels(sequelize) {
  // --- NÍVEL 0 ---
  var clientes = _clientes(sequelize, DataTypes);
  var departamentos = _departamentos(sequelize, DataTypes); // MOVIMENTEI PARA CIMA
  var fornecedores = _fornecedores(sequelize, DataTypes);
  var produtos = _produtos(sequelize, DataTypes);
  var manutencoes = _manutencoes(sequelize, DataTypes);
  var permissoes = _permissoes(sequelize, DataTypes);
  var financeiro = _financeiro(sequelize, DataTypes);

  // --- NÍVEL 1 ---
  var usuarios = _usuarios(sequelize, DataTypes);
  var funcionarios = _funcionarios(sequelize, DataTypes);
  var pedidos_compra = _pedidos_compra(sequelize, DataTypes);
  var movimentacoes_estoque = _movimentacoes_estoque(sequelize, DataTypes);
  var ordens_servico = _ordens_servico(sequelize, DataTypes);

  // --- NÍVEL 2 ---
  var agenda = _agenda(sequelize, DataTypes);
  var ponto = _ponto(sequelize, DataTypes);
  var relatorios = _relatorios(sequelize, DataTypes);
  var usuario_permissoes = _usuario_permissoes(sequelize, DataTypes);
  var ordens_producao = _ordens_producao(sequelize, DataTypes);
  
  // --- NÍVEL 3 ---
  var etapas_producao = _etapas_producao(sequelize, DataTypes);
  var qualidade = _qualidade(sequelize, DataTypes);


  // --- DEFINIÇÃO CENTRALIZADA DE TODAS AS ASSOCIAÇÕES ---
  
  // Nível 0 -> Nível 1
  usuarios.belongsTo(departamentos, { as: "departamento_usuario", foreignKey: "departamento_id"}); // Nome de 'as' alterado para ser único
  departamentos.hasMany(usuarios, { as: "usuarios_departamento", foreignKey: "departamento_id"});

  funcionarios.belongsTo(departamentos, { as: "departamento", foreignKey: "departamento_id"});
  departamentos.hasMany(funcionarios, { as: "funcionarios", foreignKey: "departamento_id"});

  pedidos_compra.belongsTo(fornecedores, { as: "fornecedor", foreignKey: "id_fornecedor"});
  fornecedores.hasMany(pedidos_compra, { as: "pedidos", foreignKey: "id_fornecedor"});

  movimentacoes_estoque.belongsTo(produtos, { as: "produto_movimentado", foreignKey: "id_produto"});
  produtos.hasMany(movimentacoes_estoque, { as: "movimentacoes", foreignKey: "id_produto"});

  ordens_servico.belongsTo(manutencoes, { as: "manutencao_os", foreignKey: "id_manutencao"});
  manutencoes.hasMany(ordens_servico, { as: "ordens_servico", foreignKey: "id_manutencao"});
  
  // Nível 0/1 -> Nível 2
  agenda.belongsTo(usuarios, { as: "criador_agenda", foreignKey: "criado_por"});
  usuarios.hasMany(agenda, { as: "agendas_criadas", foreignKey: "criado_por"});

  ponto.belongsTo(funcionarios, { as: "funcionario_ponto", foreignKey: "id_funcionario"});
  funcionarios.hasMany(ponto, { as: "registros_ponto", foreignKey: "id_funcionario"});

  relatorios.belongsTo(usuarios, { as: "criador", foreignKey: "criado_por"});
  usuarios.hasMany(relatorios, { as: "relatorios_criados", foreignKey: "criado_por"});

  usuario_permissoes.belongsTo(usuarios, { as: "usuario_permissao", foreignKey: "id_usuario"});
  usuarios.hasMany(usuario_permissoes, { as: "permissoes_usuario", foreignKey: "id_usuario"});
  usuario_permissoes.belongsTo(permissoes, { as: "permissao_info", foreignKey: "id_permissao"});
  permissoes.hasMany(usuario_permissoes, { as: "usuarios_com_permissao", foreignKey: "id_permissao"});

  ordens_producao.belongsTo(usuarios, { as: "criador", foreignKey: "criado_por"});
  usuarios.hasMany(ordens_producao, { as: "ordens_criadas", foreignKey: "criado_por"});
  
  ordens_producao.belongsTo(clientes, { as: "cliente", foreignKey: "id_cliente"});
  clientes.hasMany(ordens_producao, { as: "ordens_producao", foreignKey: "id_cliente"});
  
  ordens_producao.belongsTo(usuarios, { as: "responsavel", foreignKey: "id_responsavel"});
  usuarios.hasMany(ordens_producao, { as: "ordens_responsaveis", foreignKey: "id_responsavel"});

  // Nível 2 -> Nível 3
  etapas_producao.belongsTo(ordens_producao, { as: "ordem_producao", foreignKey: "id_ordem"});
  ordens_producao.hasMany(etapas_producao, { as: "etapas", foreignKey: "id_ordem"});

  qualidade.belongsTo(ordens_producao, { as: "ordem_inspecionada", foreignKey: "id_ordem"});
  ordens_producao.hasMany(qualidade, { as: "inspecoes", foreignKey: "id_ordem"});

  return {
    agenda, clientes, departamentos, etapas_producao, financeiro, fornecedores,
    funcionarios, manutencoes, movimentacoes_estoque, ordens_producao,
    ordens_servico, pedidos_compra, permissoes, ponto, produtos, qualidade,
    relatorios, usuario_permissoes, usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;