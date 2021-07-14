/*--------------------------------------- Contantes ----------------------------------------------------*/

let DIRECCIONES = {
    ARRIBA:1,
    ABAJO:2,
    IZQUIERDA:3,
    DERECHA: 4,
}

const FPS = 1000/12;

let CANVAS = document.getElementById('juegoCanvas');
let CTX = CANVAS.getContext('2d');

let PUNTOS_TEXTO = document.getElementById('puntaje');
let SONIDO_GANASTE_PUNTO = new Audio('ganaste_un_punto.wav');
let CONTENEDOR_NINTENDO = document.getElementById('contenidoNintendo');
let BANNER_ROTAR_TELEFONO = document.getElementById('bannerRotarTelefono');
let TITULO = document.getElementById('titulo');
let BOTON_CERRAR_BANNER = document.getElementById('bottonCerrarBanner');

let CSS_CLASS_SHAKE = 'shake-horizontal';
let CSS_CLASS_ESCONDER = 'esconder';

/*------------------------------ Estado del juego(variables) --------------------------------------*/

let snake;
let direccionActual;//Esta variable sirve para que cuando intentemos ir hacia 
//arriba no podemos ir de una vez hacia abajo y asi con la izquierda y derecha.
let nuevaDireccion;
let ciclo;
let comida;
let puntos;


/*----------------------------------------------  Dibujar --------------------------------------------*/

function dibujarCuadricula(context){
    for(let x = 20; x < 600; x+= 20){
        context.beginPath();
        context.fillStyle = "black";
        context.moveTo(x, 0);      
        context.lineTo(x, 600)        
        context.stroke();
    }
    
    for(let y = 20; y < 600; y+= 20){
        context.beginPath();
        context.fillStyle = "black";
        context.moveTo(0, y);      
        context.lineTo(600, y)        
        context.stroke();
    }
}

function dibujarParedes(context){
    context.beginPath();
    context.lineWidth = "2"; 
    context.rect(20, 20, 560,560);        
    context.stroke();
}

function rellenarCuadrado(context,posX,posY,color){
    context.beginPath();  
    context.fillStyle = color;  
    context.fillRect(posX,posY,20,20); 
    context.stroke();
}

function dibujarSnake(context,snake){
    //Culebrita
    for(let f = 0; f < snake.length; f++){
        rellenarCuadrado(context,snake[f].x,snake[f].y, "rgba(0, 0, 0, 0.849)");
    }
}

function dibujarComida(context, comida){
    rellenarCuadrado(context, comida.x, comida.y, "rebeccapurple");
}

function dibujarTexto(context, texto, x ,y){
    context.font = "38px Arial"; //Tipo de txt y size
    context.textAlign = 'center';
    context.fillStyle = "black";
    context.fillText(texto , x, y);
}

/*----------------------------------------------  Comida -------------------------------------------*/

function generarNuevaPosicionComida(snake){
    while(true){
        let columnaX = Math.floor(Math.random() * 29);
        let columnaY = Math.floor(Math.random() * 29);
        /* OR
        let columnaX = Math.max(Math.floor(Math.random() * 29),1);
        let columnaY = Math.max(Math.floor(Math.random() * 29),1);
        Aqui sacaria el numero mayor si es un cero cogeria el 1.
        */
        if(columnaX == 0){
            columnaX = 1;
        }

        if(columnaY == 0){
            columnaY = 1
        }

        let posX = columnaX * 20;
        let posY = columnaY * 20;

        let colisionSnake = false;
        for(let i = 0; i < snake.length; i++){
            if(snake[i].x == posX && snake[i].y == posY){
                colisionSnake = true;
                break;
            }
        }

        if(colisionSnake == true){
            continue;
        }
        return {x: posX, y: posY};
    }
}

function snakeCome(snake, comida){
    return snake[0].x == comida.x && snake[0].y == comida.y
}

/*---------------------------------------------- Colision -------------------------------------------*/

function ocurrioColision(snake){
    let cabeza = snake[0];

    if(
        cabeza.x < 20 ||
        cabeza.y < 20 ||
        cabeza.x >= 580 ||
        cabeza.y >= 580 
    ){
        return true;
    }
    
    if(snake.length == 1){ return false;};
    
    for(let i = 1; i < snake.length; i++){
        if(cabeza.x == snake[i].x && cabeza.y == snake[i].y){
            return true;
        }
    }

    return false;
}

/*---------------------------------------------- Puntaje -------------------------------------------*/

function mostrarPuntos(puntos){
    PUNTOS_TEXTO.innerText = 'PUNTOS: ' + puntos;
}

function incrementarPuntaje(){
    puntos++;
    mostrarPuntos(puntos);
    SONIDO_GANASTE_PUNTO.play();
}

/*------------------------------------------ Modifica snake(mover) ----------------------------------*/

function moverSnake(direccion, snake){
    let cabezaX = snake[0].x;
    let cabezaY = snake[0].y;

    if(direccion == DIRECCIONES.ARRIBA){
        cabezaY -= 20;
    }else if(direccion == DIRECCIONES.ABAJO){
        cabezaY += 20;
    }else if(direccion == DIRECCIONES.DERECHA){
        cabezaX += 20;
    }else if(direccion == DIRECCIONES.IZQUIERDA){
        cabezaX -= 20;
    }
    //Colocar la nueva cabeza al principio de la lista
    snake.unshift({x: cabezaX, y: cabezaY});
    //Eliminar la cola ultima elemento del objeto
    return snake.pop();
}


/*
Manera 1 de borrar en canvas
function borrarCanvas(canvas){
    canvas.width = '600';
    canvas.height = '600';
}
*/

/*------------------------------------------- Responsive -------------------------------------------*/

window.addEventListener('orientationchange', function(){
    TITULO.classList.add(CSS_CLASS_ESCONDER);
    BANNER_ROTAR_TELEFONO.classList.remove(CSS_CLASS_ESCONDER);
});

BOTON_CERRAR_BANNER.addEventListener('click', function(){
    TITULO.classList.remove(CSS_CLASS_ESCONDER);
    BANNER_ROTAR_TELEFONO.classList.add(CSS_CLASS_ESCONDER);
});

/*------------------------------------------ Ciclo del juego --------------------------------------*/


document.addEventListener('keydown', function(tecla){
    if(tecla.key == 'ArrowUp' && direccionActual != DIRECCIONES.ABAJO){
        nuevaDireccion = DIRECCIONES.ARRIBA;
    }else if(tecla.key == 'ArrowDown'&& direccionActual != DIRECCIONES.ARRIBA){
        nuevaDireccion = DIRECCIONES.ABAJO;
    }else if(tecla.key == 'ArrowRight' && direccionActual != DIRECCIONES.IZQUIERDA){
        nuevaDireccion = DIRECCIONES.DERECHA;
    }else if(tecla.key == 'ArrowLeft' && direccionActual != DIRECCIONES.DERECHA){
        nuevaDireccion = DIRECCIONES.IZQUIERDA;
    } 
});

//Esta funcion sirve para que la serpiente se mueva constantemente
function cicloDeJuego(){
    let colaDescartada = moverSnake(nuevaDireccion, snake);
    direccionActual = nuevaDireccion;

    if(snakeCome(snake, comida)){
        snake.push(colaDescartada);
        comida = generarNuevaPosicionComida(snake);
        incrementarPuntaje();
    }

    if(ocurrioColision(snake)){
        gameOver();
        return;
    }

    CTX.clearRect(0,0,600,600);
    // dibujarCuadricula(CTX);
    dibujarParedes(CTX);
    dibujarComida(CTX, comida);
    dibujarSnake(CTX, snake);
}

function gameOver() {
    clearInterval(ciclo);
    ciclo = undefined;
    dibujarTexto(CTX, "¡Fin del Juego!", 300, 260);
    dibujarTexto(CTX, "Click para volver a jugar", 300, 310);
    dibujarTexto(CTX, `Puntaje: ${puntos}`, 300, 360);
    CONTENEDOR_NINTENDO.classList.add(CSS_CLASS_SHAKE);
}

function empezarJuego(){
    //Lo colocamos en un objeto en vez de dos variables
    // let x= 0; //horizontal
    // let y = 0;  //vertical
    snake = [
        {x: 80, y: 20,},//cabeza
        {x: 60, y: 20,},
        {x: 40, y: 20,}
    ]
    
    direccionActual = DIRECCIONES.DERECHA ;//Esta variable sirve para que cuando intentemos ir hacia 
    //arriba no podemos ir de una vez hacia abajo y asi con la izquierda y derecha.
    nuevaDireccion = DIRECCIONES.DERECHA ;
    comida = generarNuevaPosicionComida(snake);
    puntos = 0;
    mostrarPuntos(puntos);

    CONTENEDOR_NINTENDO.classList.remove(CSS_CLASS_SHAKE);

    ciclo = setInterval(cicloDeJuego, FPS);
}

// dibujarCuadricula(CTX);
dibujarParedes(CTX);
dibujarTexto(CTX, "¡Click para empezar!", 300, 260);
dibujarTexto(CTX, "Desktop: Muévete con ↑ ↓ → ←", 300, 310);
dibujarTexto(CTX, "Móbil: Tap para girar la culebra", 300, 360);


CANVAS.addEventListener('click', function(){
    if(ciclo === undefined){
       empezarJuego();
       return;
    }

    if(direccionActual == DIRECCIONES.ABAJO){
        nuevaDireccion = DIRECCIONES.IZQUIERDA;
    }else if(direccionActual == DIRECCIONES.IZQUIERDA){
        nuevaDireccion = DIRECCIONES.ARRIBA;
    }else if(direccionActual == DIRECCIONES.ARRIBA){
        nuevaDireccion = DIRECCIONES.DERECHA;
    }else if(direccionActual == DIRECCIONES.DERECHA){
        nuevaDireccion = DIRECCIONES.ABAJO;
    }
});
