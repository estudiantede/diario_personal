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
   * Año bisiesto
   * Cuantos días tiene el mes
   * En que día cae tal fecha
   * Cuantas filas ocuparía el mes
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