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


app.get('/404',(req,res)=>{
    res.sendFile(__dirname+'/404.html')
})



app.listen(port, () => {
  console.log(`App de exemplo esta rodando na porta ${port}`)
})
