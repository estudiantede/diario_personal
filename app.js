//Requires
body_parser = require('body-parser')
const express = require('express')
let fs = require('fs');
const { type } = require('os');
//Creation of the server
const app = express()
const port = 3000


//Middleware
app.use(body_parser.urlencoded({ extended: false })) //Para poder acceder a los parametros con POST, por medio del req.body[nombre_del-parametro]

app.use(express.static('public')) //Para enviar el archivo js.js, el css y las imagines

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip + " - " + req.url)
  console.log()
  next()
}) 

app.get('/', (req, res) => {

  redireccionar_a_mes_sin_parametros(res)
})

app.get('/mes', (req, res) => {
  console.log(req.query["month"])
  let mes = req.query["month"]
  let year = req.query["year"]
  
  if (req.query["month"] === undefined || req.query["year"] === undefined) {
    redireccionar_a_mes_sin_parametros(res)
  } else {
    res.sendFile(__dirname + '/views/mes_con_6_filas.html')
  }

})

app.post('/api/mes', (req, res) => {
  if (req.body['month'] === undefined || req.body['year'] === undefined) {
    console.log("Hubo problemas")
    res.status(404).send('NO SE CUMPLEN LOS ARGUMENTOS PARA PASARLOS')
  }
  let mes = req.body['month']
  let year = req.body['year']
  let mes_anterior, year_anterior;
  is_year_bis = is_leap_year(mes)
  cantidad_de_dias_del_mes = cuantos_dias_tiene_el_mes(mes, year)
  cuando_cae_1er_dia = dia_en_que_cae_la_1er_fecha_de_un_mes(mes, year)
  if (mes === 1) {
    mes_anterior = 12
    year_anterior = year - 1
  }  else {
    mes_anterior = mes - 1
    year_anterior = year
  }
  cantidad_de_dias_del_mes_anterior = cuantos_dias_tiene_el_mes(mes_anterior, year_anterior)
  res.json({
    "is_year_bis" : is_year_bis,
    "cantidad_de_dias_del_mes" : cantidad_de_dias_del_mes,
    "cuando_cae_1er_dia" : cuando_cae_1er_dia,
    "cantidad_de_dias_del_mes_anterior" : cantidad_de_dias_del_mes_anterior,
    "cuantas_filas_ocupa_el_mes" : cuantas_filas_ocuparia_un_mes(cantidad_de_dias_del_mes, cuando_cae_1er_dia)
  })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

function redireccionar_a_mes_sin_parametros(res) {
  let date = new Date()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  parameters = '?month=' + month + '&year=' + year
  res.redirect('/mes' + parameters)
}

//Devuelve true si y solo sí el año es bisiesto
function is_leap_year(year) {
  let bis;
  if (year % 4 != 0) {
    bis = false
  }
  else if (year % 100 != 0) {
    bis = true
  }
  else if (year % 400 != 0) {
    bis = false
  } else {
    bis = true
  }
  return bis
}

var dias_del_mes = {
  1  : 31,
  2  : 28, //Si no es año bisiesto
  3  : 31,
  4  : 30,
  5  : 31,
  6  : 30,
  7  : 31,
  8  : 31,
  9  : 30,
  10 : 31,
  11 : 30,
  12 : 31,
}

function cuantos_dias_tiene_el_mes(month, year) {
  let dias
  if (is_leap_year(year) === true && month === 2) {
    dias = 29
  } else {
    dias = dias_del_mes[month]
  }
  return dias
}

function dia_en_que_cae_la_1er_fecha_de_un_mes(month, year) {
  let date = new Date(year, (month - 1), 1)
  let dia = date.getDay()
  // Sunday - Saturday : 0 - 6 
  //Corregirlo para que vaya desde el Monday - Sunday: 0 - 6
  return correr_n_lugares_modulo_x(dia, -1, 7) //Lo debería de corregir
}

//Mi objetivo, tenog que sumar -1, o 6 son lo mismo
//0 DOM --> 6 DOM
//1 LUN --> 0 LUN
//2 MAR --> 1 MAR
//3 MIE --> 2 MIE
//4 JUE --> 3 JUE
//5 VIE --> 4 VIE
//6 SAB --> 5 SAB

/*
 * requiere: {true}
 * asegura: {devuelve el resto}
 * Los restos son el resto q se obtiene tras hacer la division entre un numero y su divisor, sienod estos 
 * enteros entre 0 <= x <= modulo - 1
 */
function correr_n_lugares_modulo_x(number_to_return, number_to_add, modulo) {
  let res
  number_to_return += number_to_add
  res = number_to_return % modulo;
  if (res < 0) {
    res += modulo
  }
  return res;
}

function cuantas_filas_ocuparia_un_mes(cantidad_de_dias, dia_en_que_empieza) {
  let res = Math.trunc(cantidad_de_dias / 7)
  let dias_que_faltan_acomodar = cantidad_de_dias % 7
  let suma_de_dias_sin_acomodar = dias_que_faltan_acomodar + dia_en_que_empieza
  //Suma de dias sin acomodar a lo sumo es 12, por lo que me fijo en dos casos importantes, si es <= 7 o lo contrario
  if (suma_de_dias_sin_acomodar <= 7) {
    res += 1
  } else {
    res += 2
  }
  return res
}



//month = 12
//year = 2023
//cantidad_de_dias_del_mes = cuantos_dias_tiene_el_mes(month, year)
//cuando_cae_primer_fecha = dia_en_que_cae_la_1er_fecha_de_un_mes(month, year)
//console.log()
//console.log(cantidad_de_dias_del_mes)
//console.log(cuando_cae_primer_fecha)
//console.log(cuantas_filas_ocuparia_un_mes(cantidad_de_dias_del_mes, dia_en_que_cae_la_1er_fecha_de_un_mes(month, year)))