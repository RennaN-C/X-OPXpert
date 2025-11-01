var DataTypes = require("sequelize").DataTypes;

var _clientes = require("./clientes");
var _departamentos = require("./departamentos"); 
var _fornecedores = require("./fornecedores");
var _produtos = require("./produtos");
var _manutencoes = require("./manutencoes");
var _permissoes = require("./permissoes");
var _financeiro = require("./financeiro");
var _usuarios = require("./usuarios"); 
var _funcionarios = require("./funcionarios"); 
var _movimentacoes_estoque = require("./movimentacoes_estoque"); 
var _ordens_servico = require("./ordens_servico"); 
var _agenda = require("./agenda"); 
var _ponto = require("./ponto"); 
var _relatorios = require("./relatorios"); 
var _usuario_permissoes = require("./usuario_permissoes"); 
var _ordens_producao = require("./ordens_producao"); 
var _etapas_producao = require("./etapas_producao"); 
var _qualidade = require("./qualidade"); 

function initModels(sequelize) {
  var clientes = _clientes(sequelize, DataTypes);
  var departamentos = _departamentos(sequelize, DataTypes); 
  var produtos = _produtos(sequelize, DataTypes);
  var manutencoes = _manutencoes(sequelize, DataTypes);
  var permissoes = _permissoes(sequelize, DataTypes);
  var financeiro = _financeiro(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var funcionarios = _funcionarios(sequelize, DataTypes);
  var pedidos_compra = _pedidos_compra(sequelize, DataTypes);
  var movimentacoes_estoque = _movimentacoes_estoque(sequelize, DataTypes);
  var ordens_servico = _ordens_servico(sequelize, DataTypes);
  var agenda = _agenda(sequelize, DataTypes);
  var ponto = _ponto(sequelize, DataTypes);
  var relatorios = _relatorios(sequelize, DataTypes);
  var usuario_permissoes = _usuario_permissoes(sequelize, DataTypes);
  var ordens_producao = _ordens_producao(sequelize, DataTypes);
  var etapas_producao = _etapas_producao(sequelize, DataTypes);
  var qualidade = _qualidade(sequelize, DataTypes);

  usuarios.belongsTo(departamentos, { as: "departamento_usuario", foreignKey: "departamento_id"}); 
  departamentos.hasMany(usuarios, { as: "usuarios_departamento", foreignKey: "departamento_id"});

  funcionarios.belongsTo(departamentos, { as: "departamento", foreignKey: "departamento_id"});
  departamentos.hasMany(funcionarios, { as: "funcionarios", foreignKey: "departamento_id"});

  pedidos_compra.belongsTo(fornecedores, { as: "fornecedor", foreignKey: "id_fornecedor"});
  fornecedores.hasMany(pedidos_compra, { as: "pedidos", foreignKey: "id_fornecedor"});

  movimentacoes_estoque.belongsTo(produtos, { as: "produto_movimentado", foreignKey: "id_produto"});
  produtos.hasMany(movimentacoes_estoque, { as: "movimentacoes", foreignKey: "id_produto"});

  ordens_servico.belongsTo(manutencoes, { as: "manutencao_os", foreignKey: "id_manutencao"});
  manutencoes.hasMany(ordens_servico, { as: "ordens_servico", foreignKey: "id_manutencao"});
  
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