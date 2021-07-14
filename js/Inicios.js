let canvas = document.getElementById('juegoCanvas');
let ctx = canvas.getContext('2d');

//Cuadradro con relleno
ctx.beginPath();  //Empezar con las instrucciones
ctx.fillStyle = "red";  // Darle color
ctx.fillRect(0, 0, 100, 100); // Cordenadas para hacer un rectangulo
        //   x y  alto ancho
ctx.stroke();      // Para que realice la instrucciones dadas

//Cuadrado sin relleno
context.beginPath();
context.lineWidth = "2";     
context.rect(20, 20, 560,560);        
context.stroke();

//Circulo
ctx.beginPath();
ctx.fillStyle = "blue";
ctx.ellipse(300, 300,   50,    50,    0,     0,    2 * Math.PI); // Cordenadas para un circulo
        //   x    y    ancho   largo rotar cortar
ctx.fill(); //Para llegar el circulo
ctx.stroke();

//Texto
ctx.font = "40px Arial"; //Tipo de txt y size
ctx.textAlign = 'center';
ctx.fillStyle = "black";
ctx.fillText('Que Honda!!', 200 , 200); // Cordenadas para el texto

//Lineas
ctx.beginPath();  
ctx.fillStyle = "black";  
ctx.moveTo(20,20); //La cordenadas desde donde va a comenzar la linea  COMIENZO
ctx.lineTo(50,50); //dibuja la lina desde este punto hasta ese punto   FINAL
ctx.stroke();  


//Funcion para sacar el numero mayor
Math.max(1,3,2,12,33,22,4);
//AQUI SACARIA EL NUMERO 33

//Saber a que tecla presionó
//                         tipo de evento de escucha
document.addEventListener('keydown', function(tecla){
        console.log('la tecla presionada fue: ', tecla);
        if(tecla.key == 'ArrowDown'){
            console.log('Abajo');
        }
});

//Borrar canvas
 ctx.clearRect(0,0,600,600);


//para ejecutar una funccion cada cuantos milisegundos
setInterval(funcion, milisegundos)

/*
document.addEventListener('keydown', function(tecla){
    let cabezaX = snake[0].x;
    let cabezaY = snake[0].y;
    
    if(tecla.key == 'ArrowUp'){
        cabezaY -=20
    }else if(tecla.key == 'ArrowDown'){
        cabezaY +=20
    }else if(tecla.key == 'ArrowRight'){
        cabezaX +=20
    }else if(tecla.key == 'ArrowLeft'){
        cabezaX -=20
    }else{
        return;
    }
    
    //borrarCanvas(canvas);
    //Manera 2 de borrar canvas
    ctx.clearRect(0,0,600,600);
    dibujarCuadricula(ctx);
    snake.unshift({x: cabezaX, y: cabezaY});//AGREGAR LA NUEVA CABEZA
    snake.pop();//ELIMINAR LA COLA
    dibujarSnake(ctx, snake);
});
*/
