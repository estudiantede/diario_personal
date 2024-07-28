const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
  }

/*
//location.href -> Devuelve la url en la que se encuentra
direccionMes = 'http://localhost:3000/mes'
direccionDia = 'http://localhost:3000/dia'
direccionSemana = 'http://localhost:3000/semana'

//Si es la básica, entonces asumo que es el día de hoy
if (location.href === direccionDia || location.href === direccionSemana || location.href === direccionMes) {
    informacion = llamar_funcion()
} else if (true){ 

}
*/
var informacion_del_calendario = {}

//Si no hay información de ningun tipo en la variable informacion del calendario
if (isObjectEmpty(informacion_del_calendario)) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let month = urlParams.get('month')
    let year = urlParams.get('year')
    llamar_funcion(month, year)
}

async function llamar_funcion(month, year) {
    fetch( '/api/mes', {
        method : 'POST',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
   }),
        body: "month=" + month + "&year=" + year
    })
    .then(response => console.log(response.status) || response) // output the status and return response
    .then(response => response.text()) // send response body to next then chain
    .then(body => console.log(body)) // you can use response body here
}

function escribir_nombre_calendario(info_sobre_calendario) {
    let cantidad_de_dias = info_sobre_calendario["cantidad_de_dias_del_mes"]
    let cantidad_de_dias_del_mes_anterior = info_sobre_calendario["cantidad_de_dias_del_mes_anterior"]
    let cuantas_filas_ocupa_el_mes = info_sobre_calendario["cuantas_filas_ocupa_el_mes"]
    let cuando_cae_1er_dia = info_sobre_calendario["cuando_cae_1er_dia"]
    let numero_de_dia_puesto_en_calendario = 1
    inner_table_html = '<tr>\n \
                    <th>LUN</th>\n \
                    <th>MAR</th>\n \
                    <th>MIE</th>\n \
                    <th>JUE</th>\n \
                    <th>VIE</th>\n \
                    <th>SAB</th>\n \
                    <th>DOM</th>\n \
                </tr>'  //Se van a agregar las 7 * 6 filas, cada una con su respectivo ID, así como clase

    for (let i = 0; i < 6; i++) {//Las 6 filas agregando 
        inner_table_html += '<tr>'
        for(let k = 0; k < 7; k++) {
            if (cuando_cae_1er_dia === 0) {
                inner_table_html += '<td>' + numero_de_dia_puesto_en_calendario + '</td>\n'
            } else {
                inner_table_html += '<td>' + (cantidad_de_dias_del_mes_anterior - cuando_cae_1er_dia) + '</td>\n'
                cuando_cae_1er_dia -= 1
            }
            numero_de_dia_puesto_en_calendario += 1
        }
    inner_table_html += '</tr>'
    }
    return inner_table_html
}


