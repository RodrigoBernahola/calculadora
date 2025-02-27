let operandoUno;
let operandoDos;
let operador;
let flag = true;

function add(a, b) {
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}


//AGREGAR VALIDACION DE DIVISION POR 0
function divide(a, b) {

    if (!b) {
        alert('No se puede dividir por 0');
        return 0;
    }

    let res = a / b;

    if (Number.isInteger(res)) {
        return res;
    };

    return res.toFixed(2);
}

function percentage(numberOne) {

    return numberOne / 100;

}


function operate(operator, numberOne, numberTwo) {


    //Transformar el string por defecto a numero para poder operar con ellos normalmente y obtener un resultado correcto.

    numberOne = parseInt(numberOne);
    numberTwo = parseInt(numberTwo);

    switch (operator) {

        case '+':
            return add(numberOne, numberTwo);
        
        case '-':
            return substract(numberOne, numberTwo);

        case '*':
            return multiply(numberOne, numberTwo);
        
        case '/':
            return divide(numberOne, numberTwo);

        case '%':
            return percentage(numberOne);
    }
}

const main = document.querySelector('.buttons-main')


function borrarContenidoDisplay() {

    //Debe dejar el display con: 0 como contenido por defecto
    const display = document.querySelector('.content');

    display.textContent = '0';

    operandoUno = '';
    operandoDos = '';
    operador = '';
    flag = true;

}

function agregarBotonPresionado(stringBotonPresionado) {

    const display = document.querySelector('.content');

    if (display.textContent === '0') {
        display.textContent = '';   
    }

    display.textContent += stringBotonPresionado;
}

//Se supone que el elemento target es un botón por el chequeo previo
function manejarBotonPresionado(event) {

    //Guardar el string del boton presionado
    let stringBotonPresionado = event.target.textContent;


    //Borrar todo lo que haya en el display antes de realizar otra cosa
    if (stringBotonPresionado === 'AC'){
        borrarContenidoDisplay();
        return
    }

    //COMPROBAR SI LO QUE SE PRESIONA ES UN BOTÓN DE NUMERO, SI LO ES, 
    // AGREGARLO AL DISPLAY ACTUAL (CONCANTENARLO AL NUMERO ACTUAL)
    

    //SI NO ES UN NUMERO, DEBE SER UN OPERADOR, POR LO CUAL, HAY QUE
    //GUARDAR EL VALOR ACTUAL DEL DISPLAY, PARA LUEGO USARLO CON EL
    //SEGUNDO operando Y EL OPERADOR INGRESADO

    const numbers = '0123456789';
    const operators = '/*-+%=';

    const display = document.querySelector('.content');

    //AGREGA EL NUMERO DEL BOTON PRESIONADO AL NUMERO ACTUAL
    if (numbers.includes(stringBotonPresionado)) {

        //SI EL OPERADOR NO HA SIDO PRESIONADO NO SE HA TERMINADO DE ESCRIBIR EL PRIMER operando, ENTONCES, CUANDO SE PRESIONE EL OPERADOR, SE HA TERMINADO DE ESCRIBIR EL PRIMER operando, POR LO TANTO HAY QUE ACTUALIZAR LA VARIABLE.
        if (!operador) {
            agregarBotonPresionado(stringBotonPresionado);
        }
        else {
            //PRIMER NUMERO PRESIONADO DESPUES DE HABER PRESIONADO UN OPERADOR Y GUARDADO ESE VALOR EN LA VARIABLE OPERANDOUNO
            if (flag) {
                display.textContent = '';
                flag = false;
            }
            agregarBotonPresionado(stringBotonPresionado);
        }

    }

    //ES OBLIGATORIO PRESIONAR EL IGUAL PARA REALIZAR LAS OPERACIONES
    //DE OTRA FORMA NO SE MOSTRARÁ EL RESULTADO


    //SI EL BOTON PRESIONADO NO ES UN NUMERO NI EL AC, DEBE SER UN 
    //OPERADOR, ENTONCES HAY QUE CHEQUEAR SI LAS VARIABLES DE NUMEROS
    //ESTAN ASIGNADAS Y SI NO HACERLO, RECORDAR EL CASO DE USO
    //EN EL QUE SE PRESIONA DOS VECES SEGUIDAS UN OPERADOR, GUARDAR
    //SIEMPRE EL ULTIMO QUE SE PRESIONE (LEER COMENTARIOS HTML)

    else if (operators.includes(stringBotonPresionado)) {
    
        //SE CONTROLA QUE AL PRESIONAR EL IGUAL NO SE DETENGA EL PROGRAMA SI NO SE HAN PROPORCIONADO TODOS LOS PARAMETROS NECESARIOS
        if (stringBotonPresionado === '=') {

            if (operandoUno && operador) {
                flag = true;
                operandoDos = display.textContent;
                let res = operate(operador, operandoUno, operandoDos);
                display.textContent = res;
            }

            else if (!operador && !operandoUno && !operandoDos) {

                alert('No se han ingresado los elementos necesarios para realizar una operación');
                borrarContenidoDisplay();
                return

            }
            
            
        }
        else {
            //EN EL CASO DE QUE SE PRESIONE UN OPERADOR MÁS DE UNA VEZ VEZ EN FORMA CONSECUTIVA, SEGUIR LO QUE INDICA EL REQUERIMIENTO, ES DECIR, REALIZAR LA OPERACION SI SE TIENEN LOS ARGUMENTOS Y MOSTRAR EL RESULTADO. DESPUES GUARDAR EL OPERADOR PRESIONADO(EL ULTIMO) EN UNA VARIABLE Y ASIGNAR AL PRIMER OPERANDO EL RESULTADO DE LA PRIMERA OPERACION REALIZADA

            //COMO SABER CUANDO TERMINO DE ESCRIBIRSE EL SEGUNDO OPERANDO? PUEDE SER QUE CUANDO SE PRESIONA UN BOTON DE OPERADOR = O CUANDO SE PRESIONA UN OPERADOR LUEGO DE HABER INTRODUCIDO EL PRIMER NUMERO EL OPERADOR Y EL SEGUNDO NUMERO, SI DESPUES DE ESTO SE PRESIONA DE NUEVO UN OPERADOR, REALIZAR LA OPERACION CON LOS VALORES ACTUALES Y ESTABLECER EL PRIMER NUMERO COMO EL RESULTADO Y EL OPERADOR ACTUAL COMO EL STRING PRESIONADO ACTUAL

            if (operador && operandoUno && !flag) {

                operandoDos = display.textContent;
                let res = operate(operador, operandoUno, operandoDos);
                display.textContent = res;

                operandoUno = res;
                operandoDos = '';
                operador = stringBotonPresionado;
                flag = true;
                return

            }

            if (!operandoUno) {
                operandoUno = display.textContent;
            }
            else if(!operandoDos){
                operandoDos = display.textContent;
            }

            operador = stringBotonPresionado;
      
            
            
        }
    }

}


//cambiar esta función despues si encuentro una mejor manera de evitar
//el comportamiento del main
function manejarClick(event) {

    if (event.target.tagName === 'MAIN') {

        alert("Presiona los botones solamente");
        return
    }

    manejarBotonPresionado(event)

}


main.addEventListener('click', manejarClick)