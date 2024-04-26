//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"En relación a la biosíntesis de ribonucleótidos de tipo purínico, el átomo 1 correspondiente a uno de los nitrógenos, procede de:",
        op0:"Aspartato",
        op1:"CO2",
        op2:"Glutamina",
        correcta:"0"
    },
    {
        id:1,
        pregunta:"La formación de malonil-CoA es el paso limitante en la formación o síntesis de ácidos grasos.¿Cuál de las siguientes moléculas no interviene en el proceso?",
        op0:"Biotina",
        op1:"NADP+",
        op2:"Acetil CoA",
        correcta:"1"
    },
    {
        id:2,
        pregunta:"Respecto a las moléculas que intervienen en la biosíntesis de purinas, tanto como precursores como a nivel energético:",
        op0:"Malonil CoA",
        op1:"Biotina.",
        op2:"Palmitil CoA",
        correcta:"0"
    },
    {
        id:3,
        pregunta:"¿Cuál de estas moléculas se relaciona con el proceso de síntesis de ácidos grasos, en concreto con su modulación?",
        op0:"El GTP es la molécula energética empleada para la síntesis de ácido adenílico",
        op1:"El ATP es la molécula energética empleada para la síntesis de ácido adenílico.",
        op2:"El ácido orotidílico es importante como precursor",
        correcta:"0"
    },
    {
        id:4,
        pregunta:"Los cerebrósidos son glucoesfingolípidos, importantes componentes de las membranas musculares de músculo y sistema nervioso, ¿cuál de los siguientes compuestos no forma parte de los mismos? ",
        op0:"Esfingosina",
        op1:"Ceramida",
        op2:"Fosfato",
        correcta:"2"
    },
    {
        id:5,
        pregunta:"En relación a la síntesis de pirimidinas, seleccione la respuesta correcta:",
        op0:"El UMP es un precursor de CTP",
        op1:"El aspartato carbamilasa se activa por con un exceso CTP y ATP",
        op2:"Están compuestas por dos ciclos, uno de ellos de 5 átomos y otro de 6",
        correcta:"0"
    },
    {
        id:6,
        pregunta:". El colesterol es un componente importante en las lipoproteínas, cada una de las mismas contiene una cantidad determinada, ¿cuál de las que se describen a continuación presenta una proporción más elevada? ",
        op0:"HDL",
        op1:"VLDL",
        op2:"LDL",
        correcta:"2"
    },
    {
        id:7,
        pregunta:"En la síntesis de nucleótidos pirimidínicos y su regulación: ",
        op0:"El ácido orotidílico es el precursor del ácido uridílico",
        op1:"El CTP es el precursor del UTP",
        op2:"Los precursores iniciales son urea y aspartato",
        correcta:"0"
    },
    {
        id:8,
        pregunta:"La lipoproteinlipasa es una hidrolasa que actúa en músculo y tejido adiposo sobre:",
        op0:"LDL y HDL",
        op1:"Quilomicrones y VLDL",
        op2:"HDL",
        correcta:"1"
    },
    {
        id:9,
        pregunta:"Seleccione la respuesta correcta en relación a los desoxirribonucleótidos que provienen de los ribonucleótidos, por reducción a nivel del carbono 2': ",
        op0:"La proteína Tiorredoxina, que actúa como donante de electrones en gran variedad de moléculas para impedir su oxidación, cobra importancia en el proceso",
        op1:"El ATP inhibe el proceso de síntesis de desoxirribonucleótidos",
        op2:"No intervienen grupos prostéticos como FAD",
        correcta:"0"
    }
]


let respuestas = [];

let cantiCorrectas = 0;

let numPregunta = 0;


function cargarPreguntas(){
    
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

    
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}


function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}


for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
   
    numPregunta++;
}


function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}


let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    
    for(i=0;i<bd_juego.length;i++){
        
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ 
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

   
    window.scrollTo(0,0);
   
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}