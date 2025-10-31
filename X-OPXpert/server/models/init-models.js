// models/init-models.js - Versão Final Centralizada
var DataTypes = require("sequelize").DataTypes;
var _agenda = require("./agenda");
var _clientes = require("./clientes");
var _departamentos = require("./departamentos");
var _etapas_producao = require("./etapas_producao");
var _financeiro = require("./financeiro");
var _fornecedores = require("./fornecedores");
var _funcionarios = require("./funcionarios");
var _manutencoes = require("./manutencoes");
var _movimentacoes_estoque = require("./movimentacoes_estoque");
var _ordens_producao = require("./ordens_producao");
var _ordens_servico = require("./ordens_servico");
var _pedidos_compra = require("./pedidos_compra");
var _permissoes = require("./permissoes");
var _ponto = require("./ponto");
var _produtos = require("./produtos");
var _qualidade = require("./qualidade");
var _relatorios = require("./relatorios");
var _usuario_permissoes = require("./usuario_permissoes");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var agenda = _agenda(sequelize, DataTypes);
  var clientes = _clientes(sequelize, DataTypes);
  var departamentos = _departamentos(sequelize, DataTypes);
  var etapas_producao = _etapas_producao(sequelize, DataTypes);
  var financeiro = _financeiro(sequelize, DataTypes);
  var fornecedores = _fornecedores(sequelize, DataTypes);
  var funcionarios = _funcionarios(sequelize, DataTypes);
  var manutencoes = _manutencoes(sequelize, DataTypes);
  var movimentacoes_estoque = _movimentacoes_estoque(sequelize, DataTypes);
  var ordens_producao = _ordens_producao(sequelize, DataTypes);
  var ordens_servico = _ordens_servico(sequelize, DataTypes);
  var pedidos_compra = _pedidos_compra(sequelize, DataTypes);
  var permissoes = _permissoes(sequelize, DataTypes);
  var ponto = _ponto(sequelize, DataTypes);
  var produtos = _produtos(sequelize, DataTypes);
  var qualidade = _qualidade(sequelize, DataTypes);
  var relatorios = _relatorios(sequelize, DataTypes);
  var usuario_permissoes = _usuario_permissoes(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  // --- DEFINIÇÃO CENTRALIZADA DE TODAS AS ASSOCIAÇÕES ---

  pedidos_compra.belongsTo(fornecedores, { as: "fornecedor", foreignKey: "id_fornecedor"});
  fornecedores.hasMany(pedidos_compra, { as: "pedidos", foreignKey: "id_fornecedor"});

  ordens_producao.belongsTo(usuarios, { as: "criador", foreignKey: "criado_por"});
  usuarios.hasMany(ordens_producao, { as: "ordens_criadas", foreignKey: "criado_por"});
  
  // --- ASSOCIAÇÃO ADICIONADA ---
  ordens_producao.belongsTo(clientes, { as: "cliente", foreignKey: "id_cliente"});
  clientes.hasMany(ordens_producao, { as: "ordens_producao", foreignKey: "id_cliente"});
  // --- FIM DA ASSOCIAÇÃO ADICIONADA ---

  relatorios.belongsTo(usuarios, { as: "criador", foreignKey: "criado_por"});
  usuarios.hasMany(relatorios, { as: "relatorios_criados", foreignKey: "criado_por"});

  funcionarios.belongsTo(departamentos, { as: "departamento", foreignKey: "departamento_id"});
  departamentos.hasMany(funcionarios, { as: "funcionarios", foreignKey: "departamento_id"});
  
  etapas_producao.belongsTo(ordens_producao, { as: "ordem_producao", foreignKey: "id_ordem"});
  ordens_producao.hasMany(etapas_producao, { as: "etapas", foreignKey: "id_ordem"});

  qualidade.belongsTo(ordens_producao, { as: "ordem_inspecionada", foreignKey: "id_ordem"});
  ordens_producao.hasMany(qualidade, { as: "inspecoes", foreignKey: "id_ordem"});

  // Adicione outras associações aqui conforme necessário

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