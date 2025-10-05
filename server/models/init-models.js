var DataTypes = require("sequelize").DataTypes;
var _agenda = require("./agenda");
var _departamentos = require("./departamentos");
var _etapas_producao = require("./etapas_producao");
var _financeiro = require("./financeiro");
var _funcionarios = require("./funcionarios");
var _manutencoes = require("./manutencoes");
var _movimentacoes_estoque = require("./movimentacoes_estoque");
var _ordens_producao = require("./ordens_producao");
var _ordens_servico = require("./ordens_servico");
var _permissoes = require("./permissoes");
var _ponto = require("./ponto");
var _produtos = require("./produtos");
var _relatorios = require("./relatorios");
var _usuario_permissoes = require("./usuario_permissoes");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var agenda = _agenda(sequelize, DataTypes);
  var departamentos = _departamentos(sequelize, DataTypes);
  var etapas_producao = _etapas_producao(sequelize, DataTypes);
  var financeiro = _financeiro(sequelize, DataTypes);
  var funcionarios = _funcionarios(sequelize, DataTypes);
  var manutencoes = _manutencoes(sequelize, DataTypes);
  var movimentacoes_estoque = _movimentacoes_estoque(sequelize, DataTypes);
  var ordens_producao = _ordens_producao(sequelize, DataTypes);
  var ordens_servico = _ordens_servico(sequelize, DataTypes);
  var permissoes = _permissoes(sequelize, DataTypes);
  var ponto = _ponto(sequelize, DataTypes);
  var produtos = _produtos(sequelize, DataTypes);
  var relatorios = _relatorios(sequelize, DataTypes);
  var usuario_permissoes = _usuario_permissoes(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  permissoes.belongsToMany(usuarios, { as: 'id_usuario_usuarios', through: usuario_permissoes, foreignKey: "id_permissao", otherKey: "id_usuario" });
  usuarios.belongsToMany(permissoes, { as: 'id_permissao_permissos', through: usuario_permissoes, foreignKey: "id_usuario", otherKey: "id_permissao" });
  funcionarios.belongsTo(departamentos, { as: "departamento", foreignKey: "departamento_id"});
  departamentos.hasMany(funcionarios, { as: "funcionarios", foreignKey: "departamento_id"});
  usuarios.belongsTo(departamentos, { as: "departamento", foreignKey: "departamento_id"});
  departamentos.hasMany(usuarios, { as: "usuarios", foreignKey: "departamento_id"});
  ponto.belongsTo(funcionarios, { as: "id_funcionario_funcionario", foreignKey: "id_funcionario"});
  funcionarios.hasMany(ponto, { as: "pontos", foreignKey: "id_funcionario"});
  ordens_servico.belongsTo(manutencoes, { as: "id_manutencao_manutenco", foreignKey: "id_manutencao"});
  manutencoes.hasMany(ordens_servico, { as: "ordens_servicos", foreignKey: "id_manutencao"});
  etapas_producao.belongsTo(ordens_producao, { as: "id_ordem_ordens_producao", foreignKey: "id_ordem"});
  ordens_producao.hasMany(etapas_producao, { as: "etapas_producaos", foreignKey: "id_ordem"});
  usuario_permissoes.belongsTo(permissoes, { as: "id_permissao_permisso", foreignKey: "id_permissao"});
  permissoes.hasMany(usuario_permissoes, { as: "usuario_permissos", foreignKey: "id_permissao"});
  movimentacoes_estoque.belongsTo(produtos, { as: "id_produto_produto", foreignKey: "id_produto"});
  produtos.hasMany(movimentacoes_estoque, { as: "movimentacoes_estoques", foreignKey: "id_produto"});
  agenda.belongsTo(usuarios, { as: "criado_por_usuario", foreignKey: "criado_por"});
  usuarios.hasMany(agenda, { as: "agendas", foreignKey: "criado_por"});
  ordens_producao.belongsTo(usuarios, { as: "criado_por_usuario", foreignKey: "criado_por"});
  usuarios.hasMany(ordens_producao, { as: "ordens_producaos", foreignKey: "criado_por"});
  relatorios.belongsTo(usuarios, { as: "criado_por_usuario", foreignKey: "criado_por"});
  usuarios.hasMany(relatorios, { as: "relatorios", foreignKey: "criado_por"});
  usuario_permissoes.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(usuario_permissoes, { as: "usuario_permissos", foreignKey: "id_usuario"});

  return {
    agenda,
    departamentos,
    etapas_producao,
    financeiro,
    funcionarios,
    manutencoes,
    movimentacoes_estoque,
    ordens_producao,
    ordens_servico,
    permissoes,
    ponto,
    produtos,
    relatorios,
    usuario_permissoes,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
