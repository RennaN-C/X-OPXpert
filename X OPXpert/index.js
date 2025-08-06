console.log('Essa é a parte inicial do sistema')

const express = require('express')
const app = express()
const port = 8080

const calculos=require('./operacoes')

app.get('/', (req, res) => {
  res.send('Olá Mundo! Dev!')
})

app.get('/infos',(req,res)=>{
    res.send("Aqui voce encontra informações sobre o servidor")
})

app.get('/cliente/:nome/:sobrenome',(req,res)=>{
    res.send(`Seja bem vindo ${req.params.nome} ${req.params.sobrenome}`)
})

app.get('/cadastro',(req,res)=>{
    res.sendFile(__dirname+'/cadastro.html')
})

app.get('/menos/:val1/:val2',(req,res)=>{
  res.send(`O valor da subtração é: ${calculos.subtracao(req.params.val1,req.params.val2)}`)
})

app.get('/multi/:val1/:val2',(req,res)=>{
  res.send(`O valor da multiplicação é: ${calculos.multiplicacao(req.params.val1,req.params.val2)}`)
})

app.get('/viagem/:distancia/:velocidade',(req,res)=>{
  res.send(`O tempo de viagem é: ${calculos.divisao(req.params.distancia,req.params.velocidade)}`)
})

app.get('/gorjeta/:conta/:porcentagem',(req,res)=>{
  res.send(`O valor da conta com gorjeta é: ${calculos.porcentagem(req.params.conta,req.params.porcentagem)}`)
})

app.listen(port, () => {
  console.log(`App de exemplo esta rodando na porta ${port}`)
})
