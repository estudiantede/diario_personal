//location.href -> Devuelve la url en la que se encuentra
direccionMes = 'http://localhost:3000/mes'
direccionDia = 'http://localhost:3000/dia'
direccionSemana = 'http://localhost:3000/semana'

//Si es la básica, entonces asumo que es el día de hoy
if (location.href === direccionDia || location.href === direccionSemana || location.href === direccionMes) {
    informacion = llamar_funcion()
} else if (true){ 

}

function es_direccion_valida() {
    return
}

function llamar_funcion(day, month, year) {
    let xhttp = new XMLHttpRequest();
    //Crea el parametro a pasar, mientras toma el valor del textarea a traducir
    let params = "day" + day + "&month" + month + "&year" + year
    xhttp.open('post', '/mes/conseguirInformacion', true) //Open a channel for communication asyncron (true)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded') //No se que hace esto
    //Create a function that is called when the readyState changes
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = xhttp.responseText;
        }
        else if (this.readyState == 4  && this.status == 404) {
            document.getElementById("demo").innerHTML = "ERROR. NO SE PUDO COMPLETAR EL PEDIDO";
        }

    //Sends the parametros and the solicitude to the rute
    xhttp.send(params);
    }
}

