//Requires
body_parser = require('body-parser')
const express = require('express')

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
  res.sendFile(__dirname + '/views/mes_con_6_filas.html')
  //redireccionar_a_mes_sin_parametros(res)
})


//Cosas a buscar:
  /*
   * Año bisiesto                     V
   * Cuantos días tiene el mes        X
   * En que día cae tal fecha         X
   * Cuantas filas ocuparía el mes    X
   * 
   */
app.get('/mes', (req, res) => {
  if (req.query.month === undefined || req.query.year === undefined) {
    redireccionar_a_mes_sin_parametros(res)
  } else {
    res.sendFile(__dirname + '/views/mes_con_6_filas.html')
  }
  

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