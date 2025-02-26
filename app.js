console.log("pepe");


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
    return a / b;
}


function operate(operator, numberOne, numberTwo) {


    //switch


}

const main = document.querySelector('.buttons-main')

function manejarBotonPresionado(event) {

    console.log(event);
    

}



function manejarClick(event) {

    //console.log(event)

    console.log(event.target.tagName);

    switch(event.target.tagName) {

        case 'MAIN':
            alert("Presiona los botones solamente");
            break;
        
        case 'BUTTON':
            manejarBotonPresionado(event);
            console.log("pepe");
            break;



    }



    



}




main.addEventListener('click', manejarClick)



//console.log(typeof main);