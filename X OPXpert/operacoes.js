exports.subtracao=(a,b)=>{
    res=a-b
    return(res)
}

exports.multiplicacao=(x,y)=>{
    res=x*y
    return(res)
}

exports.divisao=(x,y)=>{
    res=x/y
    return(res)
}

exports.porcentagem=(x,y)=>{
    x=parseFloat(x)
    y=parseFloat(y)
    gorjeta=x*(y/100)
    return(x+gorjeta)
}