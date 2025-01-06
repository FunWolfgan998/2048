let npoteri_che_puoi_usare=1;
let punteggio=0;
let best=0;
let tabella=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let time=600000
let time_left=time/1000



window.onload= function (){
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return;
        }
        //input tramite frecce
        switch (event.key) {
          case "ArrowDown":
                //move(2)
                console.log(event.key)
                move_direction(2)
            break;
          case "ArrowUp":
                //move(0)
                console.log(event.key)
                move_direction(0)
            break;
          case "ArrowLeft":
                //move(1)
                console.log(event.key)
                move_direction(1)
            break;
          case "ArrowRight":
                //move(3)
                console.log(event.key)
                move_direction(3)
            break;
          default:
            return;
        }
      }, true);
}
function Start_game() {
    document.getElementById("start_game").style.display="none"
    document.getElementById("message").style.display="none"

    document.getElementById("game").style.display="block"
    //elemnti che si resettano quanodo prendi start again
    tabella=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    time=600000//10 min
    npoteri_che_puoi_usare=1
    punteggio=0
    document.getElementById("cestino").style.display="block"
    document.getElementById("ordine").style.display="block"

    //10 minuti per arrivare alla vittoria
    setTimeout(() => {
        alert("you lose")
        lose()
    }, time);

    // Aggiorna il tempo visualizzato sullo schermo
    time_left=time/1000
    
    time_text = `Time left: ${Math.floor(time_left/60)}min ${time_left%60}sec`
    document.getElementById("time").innerText=time_text
    update_score()
    let secondi = setInterval(() => {
        time_left-=1
        if(time_left==0){
            clearInterval(secondi)
        }
        update_time(time_left)
        update_score()
    }, 1000);

    generate_table()

    spawn_new_number()
    spawn_new_number()
    console.log(tabella)
}
function update_time(time_left){
    let time_text = `Time left: ${Math.floor(time_left/60)}min ${time_left%60}sec`
    document.getElementById("time").innerText=time_text
}
function update_score(){
    console.log(punteggio)
    let text=`Score = ${punteggio}`
    document.getElementById("score").innerText=text
}
function generate_table(){
    let table = document.createElement("table")
    table.id="table_generata"
    for (let i = 0; i<4;i++){
        let tr = document.createElement("tr")
        for (let j = 0; j<4;j++){
            let td = document.createElement("td")
            td.id=`${i}_${j}`
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    document.getElementById("table").appendChild(table)
    console.log(table)
    console.log(tabella)
}

function update_table(){
    for (let i = 0; i<4;i++){
        for (let j = 0; j<4;j++){
            let td = document.getElementById(`${i}_${j}`)
            let value=tabella[i][j]
            if(value!=0){
                let background=getBackground(value);
                background=`url('img/${background}')`
                td.style.backgroundImage=background
            }else{
                td.style.backgroundImage="none"
            }
            let background_color=update_color(value)
            td.style.backgroundColor=background_color
        }
    }
}

function getBackground(value){
    switch (value) {
        case 2: return "2.png";
        case 4: return "4.png";
        case 8: return "8.png";
        case 16: return "16.png";
        case 32: return "32.png";
        case 64: return "64.png";
        case 128: return "128.png";
        case 256: return "256.png";
        case 512: return "512.png";
        case 1024: return "1024.png";
        case 2048: return "2048.png";
        default: return
    }
}

function update_color(valtabella) {
    switch (valtabella) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f65e3b';
        case 128: return '#edcf72';
        case 256: return '#edcc61';
        case 512: return '#edc850';
        case 1024: return '#edc53f';
        case 2048: return '#edc22e';
        default: return '#a85a00';
    }
}

function spawn_new_number(){
    let caselle_vuote = 0;
    let caselle_vuote_posizione = [];
    for (let i = 0; i<4;i++){
        for (let j = 0; j<4;j++){
            if(tabella[i][j]==0){
                caselle_vuote+=1
                caselle_vuote_posizione.push([i,j])
            }
        }
    }
    if(caselle_vuote!=0){
    let spazio_scelto=Math.floor(Math.random()*caselle_vuote)
    let pos=caselle_vuote_posizione[spazio_scelto]
    let due_o_quattro=8;
    Math.floor(Math.random()*10)==4 ? due_o_quattro = 4 : due_o_quattro = 2
    tabella[pos[0]][pos[1]]= due_o_quattro
    console.log()
    update_table()       
    }
}


function move_direction(direction){
    if(direction==3||direction==1){
        let inverti = direction==1 ? false : true
        for(let i=0; i<4; i++){
            let array=[]

            for(let j=0; j<4;j++){
                array.push(tabella[i][j])
            }

            if(inverti){
                array.reverse()
            }               
            array=add_same(array)

            if(inverti){
                array.reverse()
            }

            for(let k=0; k<4; k++){
                tabella[i][k]=array[k]
            }
        }
    }else{
        let inverti = direction==2 ? true : false 
        for(let i=0; i<4; i++){
            let array=[]

            for(let j=0; j<4;j++){
                array.push(tabella[j][i])
            }
            if(inverti){
                array.reverse()
            }               
            array=add_same(array)

            if(inverti){
                array.reverse()
            }

            for(let k=0; k<4; k++){
                tabella[k][i]=array[k]
            }
            
        }
    }
    setTimeout(() => {
        spawn_new_number()
        check_if_movable()
    }, 200);
    check_if_win()
    update_table()

console.log(tabella)
}

function add_same(array){
    let array_vuoto=JSON.parse(JSON.stringify(array));
    array_vuoto=array_vuoto.filter(item => item !== 0);
    if(array_vuoto.length==0){return array=[0,0,0,0]}
    for(let i = 0; i<array_vuoto.length; i++){
        if(array_vuoto[i]!=0){
            if(array_vuoto[i]==array_vuoto[i+1]){
                array_vuoto[i]=array_vuoto[i]*2
                array_vuoto[i+1]=0
                punteggio+=array_vuoto[i]*2
                update_score()
                }
            }else{
                array_vuoto[i]=0
            }
        }
    array_vuoto=array_vuoto.filter(item => item !== 0);
    for(let k=array_vuoto.length;k<4;k++){
        array_vuoto.push(0)  
    }
    console.log(array_vuoto)
    return array_vuoto
}
function check_if_win(){
    for (let i = 0; i<4;i++){
        for (let j = 0; j<4;j++){
            if(tabella[i][j]==2048){
                win()
            }
        }
    }
}
function check_if_movable(){
    for(let i=0; i<4; i++){
        for(let j=0; j<4;j++){
            //angolo alto a sinistra e controlla sotto e a detìstra
            if(i==0&&j==0){
                if((tabella[i+1][j]==0||tabella[i+1][j]==tabella[i][j])||(tabella[i][j+1]==0||tabella[i][j+1]==tabella[i][j])){
                    return 
                }
                //angolo alto a destra controlla sotto e a sinistra
            }else if(i==0&&j==3){
                if((tabella[i+1][j]==0||tabella[i+1][j]==tabella[i][j])||(tabella[i][j-1]==0||tabella[i][j-1]==tabella[i][j])){
                    return 
                }
                //angolo baso a sinistra controlla sopra e destra                
            }else if(i==3&&j==0){
                if((tabella[i-1][j]==0||tabella[i-1][j]==tabella[i][j])||(tabella[i][j+1]==0||tabella[i][j+1]==tabella[i][j])){
                    return 
                }
                //angolo basso a destra controlla sopra e sinistra
            }else if(i==3&&j==3){
                if((tabella[i-1][j]==0||tabella[i-1][j]==tabella[i][j])||(tabella[i][j-1]==0||tabella[i][j-1]==tabella[i][j])){
                    return 
                }
                //lato sinistro controlla alla propria destra (+j) e al sopra e sotto suo(+-i) 
            }else if((i<3&&i>0)&&j==0){
                if((tabella[i][j+1]==0||tabella[i][j+1]==tabella[i][j])||(tabella[i+1][j]==0||tabella[i+1][j]==tabella[i][j])||(tabella[i-1][j]==0||tabella[i-1][j]==tabella[i][j])){
                    return 
                }
                //lato destro controlla alla propria sinistra (-j) e al sopra e sotto suo(+-i) 
            }else if((i<3&&i>0)&&j==3){
                if((tabella[i][j-1]==0||tabella[i][j-1]==tabella[i][j])||(tabella[i+1][j]==0||tabella[i+1][j]==tabella[i][j])||(tabella[i-1][j]==0||tabella[i-1][j]==tabella[i][j])){
                    return 
                }
                //lato "tetto" controlla sotto (+i) e ai lati (+-j)
            }else if((j<3&&j>0)&&i==0){
                if((tabella[i+1][j]==0||tabella[i+1][j]==tabella[i][j])||(tabella[i][j+1]==0||tabella[i][j+1]==tabella[i][j])||(tabella[i][j-1]==0||tabella[i][j-1]==tabella[i][j])){
                    return 
                }
                //lato "pavimento" controllo sopra (-i) e ai lati (+-j)
            }else if((j<3&&j>0)&&i==3){
                if((tabella[i-1][j]==0||tabella[i-1][j]==tabella[i][j])||(tabella[i][j+1]==0||tabella[i][j+1]==tabella[i][j])||(tabella[i][j-1]==0||tabella[i][j-1]==tabella[i][j])){
                    return 
                }
                //centro controllo tutti le direzioni (+-i) (+-j)
            }else if((i<3&&i>0)&&(j<3&&j>0)){
                if((tabella[i-1][j]==0||tabella[i-1][j]==tabella[i][j])||(tabella[i+1][j]==0||tabella[i+1][j]==tabella[i][j])||(tabella[i][j+1]==0||tabella[i][j+1]==tabella[i][j])||(tabella[i][j-1]==0||tabella[i][j-1]==tabella[i][j])){
                    return 
                }
            }

        }
    }
    lose()
}
function rimuovi_piccoli(){
    npoteri_che_puoi_usare=0
    for (let i = 0; i<4;i++){
        for (let j = 0; j<4;j++){
            if(tabella[i][j]==2||tabella[i][j]==4){
                tabella[i][j]=0
            }
        }
    }
    document.getElementById("cestino").style.display="none"
    document.getElementById("ordine").style.display="none"
    update_table()

}
function riordina(){
    npoteri_che_puoi_usare=0
    let array=[]
    for (let i = 0; i<4;i++){
        for (let j = 0; j<4;j++){
            array.push(tabella[i][j])
        }
    }
    array=array.sort((a, b) => a - b);
    
    let a_lenght=array.length
    for(let z=a_lenght;z<16;z++){
        array.push(0)
    }
    let x=15;
    for (let i = 0; i<4;i++){
        for (let j = 0; j<4;j++){
            tabella[i][j]=array[x]
            x-=1    
        }
    }
    update_table()
    document.getElementById("cestino").style.display="none"
    document.getElementById("ordine").style.display="none"
}
function win(){
    if(punteggio>best){
        best=punteggio
        document.getElementById("best").innerText=`Best score : ${best}`
    }
    document.getElementById("table").removeChild(document.getElementById("table_generata"))
    document.getElementById("start_game").style.display="block"
    document.getElementById("game").style.display="none"
    document.getElementById("message").style.display="block"
    document.getElementById("message").innerText=`You Win GG !!`
    
}
function lose(){
    if(npoteri_che_puoi_usare==1&&time_left>0){
        return
    }else{
        document.getElementById("start_game").style.display="block"
        document.getElementById("game").style.display="none"
        document.getElementById("message").style.display="block"
        document.getElementById("message").innerText=`You lost. Score: ${punteggio}`
        console.log("you lose")
        if(punteggio>best){
            best=punteggio
            document.getElementById("best").innerText=`Best score : ${best}`
        }

        document.getElementById("table").removeChild(document.getElementById("table_generata"))
    }

}
/*tentativo di fare le animazioni utilizzando i blocchi. Non so bene cosa sbagliato ma non so come mai quando provo a fare una mossa e allo stesso tempo un l'altra l'ordine del array è al contraio di come dovrebbe (solo però il primo array cioè la prima riga/colonna)  
let tabella =[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let score=0;

const dimension=4;

window.onload= function (){
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return;
        }
        //input tramite frecce
        switch (event.key) {
          case "ArrowDown":
                //move(2)
                console.log(event.key)
                move_direction(2)
            break;
          case "ArrowUp":
                //move(0)
                console.log(event.key)
                move_direction(0)
            break;
          case "ArrowLeft":
                //move(1)
                console.log(event.key)
                move_direction(1)
            break;
          case "ArrowRight":
                //move(3)
                console.log(event.key)
                move_direction(3)
            break;
          default:
            return;
        }
      }, true);
}


function Start_game() {
    let time=300000

    //5 minuti per arrivare alla vittoria
    setTimeout(() => {
        alert("you lose")
        lose()
    }, time);

    // Aggiorna il tempo visualizzato sullo schermo
    let time_left=time/1000
    
    time_text = `Time left: ${Math.floor(time_left/60)}min ${time_left%60}sec`
    document.getElementById("time").innerText=time_text

    let secondi = setInterval(() => {
        time_left-=1
        if(time_left==0){
            clearInterval(secondi)
        }
        update_time(time_left)
        update_score(score)
    }, 1000);

    create_table(4)

    //Rendo visibile la tabella, il tempo e il punteggio
    document.getElementById("game").style.display="block"
    document.getElementById("start_game").style.display="none"
    spawn_new_block()
    spawn_new_block()

}

//aggiorna il testo mostrato sullo schermo
function update_time(time_left){
    let time_text = `Time left: ${Math.floor(time_left/60)}min ${time_left%60}sec`
    update_score()
    document.getElementById("time").innerText=time_text
}
function update_score(score){
    document.getElementById("score").innerText=`Punteggio = ${score}`
}
//crea la tabella dove si posizioneranno i numeri 
function create_table() {
    let table = document.createElement("table")
    table.classList.add("griglia");
    let div_griglia=document.createElement("div")
    div_griglia.id="griglia_sopra"
    div_griglia.classList.add("griglia_sopra");
    table.appendChild(div_griglia)
    for (let i = 0; i<dimension;i++){
        let tr = document.createElement("tr")
        for (let j = 0; j<dimension;j++){
            let td = document.createElement("td")
            td.id=`${j}_${i}`
            td.innerText=`${j}_${i}`
            td.classList.add("griglia");
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    document.getElementById("table").appendChild(table)
    console.log(table)
}

//genera un blocco del valore che voglio
function create_block_with_value(x,y,value){
    let block= document.createElement("div");

    //salvo informazioni di questo blocco attraverso il id e contiene la posizione e il valore che rappresenta
    block.id=`${x}-${y}-${value}`
    //aggiungo lo stile attraverso la classe block
    let background=getBackground(value);
    let background_color=update_color(value)
    block.classList.add("block");
    //aggiungo l'immagine immagine di background
    background=`url('img/${background}')`
    block.style.backgroundImage=background
    block.style.backgroundColor=background_color
    //posiziona il blocco nella posizione corretta
    let block_position = []
    block_position=calcolo_posizione(x,y)

    block.style.transform = `translate(${block_position[0]}px, ${block_position[1]}px)`;
    //aggiorna la tabella con il valore nuovo
    tabella[y][x]= value
    document.getElementById("griglia_sopra").appendChild(block);

}

function getBackground(value){
    switch (value) {
        case 2: return "2.png";
        case 4: return "4.png";
        case 8: return "8.png";
        case 16: return "16.png";
        case 32: return "32.png";
        case 64: return "64.png";
        case 128: return "128.png";
        case 256: return "256.png";
        case 512: return "512.png";
        case 1024: return "1024.png";
        case 2048: return "2048.png";
        default: return
    }
}

function update_color(valtabella) {
    switch (valtabella) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f65e3b';
        case 128: return '#edcf72';
        case 256: return '#edcc61';
        case 512: return '#edc850';
        case 1024: return '#edc53f';
        case 2048: return '#edc22e';
        default: return '#cdc1b4';
    }
}
//calcola la posizione del numero in base alla locazione in tabella
function calcolo_posizione(x,y){
    let fix_x = 0;
	let fix_y = 5;
	let delta = 96.9;
    console.log([fix_x+delta*x, fix_y+delta*y],x,y)
	return ([fix_x+delta*x, fix_y+delta*y]);
}
//genera un 2 o un 4 lo genera come blocco e lo inserisce nella tabella 
function spawn_new_block(){
    let spazi_vuoti= check_vuoti()
    let spazio_scelto= Math.floor(Math.random()*spazi_vuoti.length)

    let x= spazi_vuoti[spazio_scelto][1]
    let y= spazi_vuoti[spazio_scelto][0]

    let two_or_four= Math.floor(Math.random()*10)==4? 4 : 2;
    create_block_with_value(x,y,two_or_four)

}


function check_vuoti(){
    //controlla ogni posizione della tabella per vedere se è vuota e si valva su una matrice le posizioni libere su cui può generare
    let spazi_vuoti=[]
    let dimension=4
    //i=Y
    for (let i = 0; i<dimension;i++){
        //j=X
        for (let j = 0; j<dimension;j++){
            if(tabella[i][j]==0){
                spazi_vuoti.push([i,j])
            }
        }
    }
    return spazi_vuoti
}

function move_direction(direzione){
    console.log(direzione) 
    //controllo in base alla direzione prim destra e poi a sinistra
    if(direzione==1||direzione==3){
        //se la direzione è destra per sfruttare lo stesso procedimanto salco questa variabile
        let invertito= direzione!=1 ? true : false
        for (let i = 0; i<dimension;i++){
            //salvo l'array con i valori
            let array_con_valori_con_zeri=[];
            //salvo la posizione di ogni elemento che ha un valore ogni elemento è un array che contiene i valori [x,y] in realtà l'array diventa una matrice
            let p_d_v=[];
            //tengo conto delle posizioni dei valori != da 0
            let p_d_v_v=[];
            for (let j = 0; j<dimension;j++){
                if(tabella[i][j]!=0){
                    array_con_valori_con_zeri.push(tabella[i][j])
                    p_d_v.push([j,i])
                    p_d_v_v.push([j,i])
                }else{
                    array_con_valori_con_zeri.push(tabella[i][j])
                    p_d_v.push([6,6])
                }
            }
            console.log("1)raccolto i dati della riga/colonna",array_con_valori_con_zeri,p_d_v,p_d_v_v)
            //qua inverto i valori per attuare la somma, visto che se sommassi prima di invertire darebbe il risoltato errato
            
            if(invertito){
                array_con_valori_con_zeri.reverse();
                p_d_v.reverse();
            }
            if(p_d_v_v.length!=0){
                if(invertito){
                    p_d_v_v.reverse();
                }

            let array_con_valori=array_con_valori_con_zeri.filter(element => element != 0);
            
            //qua prima di attuare la somma per evitare passaggi inutili controllo che la lunghezza è = a 1 o 0 visto che non si sommerebbe nulla in entrambi i casi
            if(array_con_valori.length!=0&&array_con_valori.length!=1){   
                /*
                Per ogni elemento dell'array controllo se il seguente ha lo stesso valore per sommarli e dando come valore  0 al secondo così da essere ignorato nel controllo. 
                Allo stesso tempo la posizione dei elementi uguali riceve un terzo elemnto con valore 1 con indica che i 2 valori avranno la stessa la posizione alla fine prima di unirsi.              
                
               for(let k=0; k<array_con_valori.length;k++){
                    if(array_con_valori[k]!=0){
                        if(array_con_valori[k]==array_con_valori[k+1]){
                            //"somma" i valori tra il primo e il secondo rendeno il secondo 0
                            array_con_valori[k]=array_con_valori[k]*2
                            array_con_valori[k+1]=0
                            //terzo elemento che indica la loro somma
                            p_d_v_v[k][2]=1
                            p_d_v_v[k+1][2]=1
                            //aggiorno il punteggio del giocatore
                            score+=array_con_valori[k]
                        }
                    }
                }
                //rimuovo i elemnti con 0 così da avere i valori nella posizione corretta prima di riempire i spazi vuoti con i 0
                array_con_valori=array_con_valori.filter(element => element != 0);
            }
            //riempo i possibili spazi bianchi
            for(let l=array_con_valori.length; l<4;l++){
                array_con_valori.push(0)
            }

            //inverto novamente per avere tutti i valori nella posizione giusta
            if(invertito){
                array_con_valori.reverse();
                array_con_valori_con_zeri.reverse();
                p_d_v.reverse();
                p_d_v_v.reverse();
            }
            
            console.log("2) array dei valori sommati e messi nell'ordine corretto",array_con_valori,"tabella con zeri",array_con_valori_con_zeri);

            // Colcolo posizione del posto in base alla posizione e allo stato
            let p_d_v_a = [];

            //unisco p_d_v e p_d_v_v salvando i valori "la terza cooridinata"
            for(let w=0;w<4;w++){
                if(p_d_v[w][0]==6){
                    p_d_v_a.push([6,6])
                }else{
                    for(let g=0;g<p_d_v_v.length;g++){
                        if(p_d_v[w][0]==p_d_v_v[g][0]){
                            p_d_v_a.push(p_d_v_v[g])
                        }
                    }
                }
            }

            console.log("3) p_d_v_a creato e aggiunge le terze cooridinate",p_d_v_a,p_d_v)
            let aggiornare_pos=false
            for(let b=0;b<4;b++){
                if(array_con_valori_con_zeri[b]!=array_con_valori[b]){
                    aggiornare_pos=true
                    break
                }
                
            }
            console.log("da ggiornare?",aggiornare_pos)
            //calcolo posizioni finali dei blocchi nella riga/colonna
            if(aggiornare_pos){
            if(invertito){
                let pos_max=3
                let pos_special=7;
                p_d_v_a.reverse();
                for(let z=0;z<4;z++){
                    if(p_d_v_a[z][0]!=6){
                        if(p_d_v_a[z][2]==1&&pos_special==7){
                            pos_special=pos_max;
                            p_d_v_a[z][0]=pos_special;
                            pos_max-=1;
                        }else if(p_d_v_a[z][2]==1&&pos_special!=7){
                            p_d_v_a[z][0]=pos_special;
                            pos_special=7;
                        }
                        else{
                            p_d_v_a[z][0]=pos_max
                            pos_max-=1
                        }
                    }
                }
            }else{
                let pos_min=0
                let pos_special=7;
                for(let z=0;z<4;z++){
                    if(p_d_v_a[z][0]!=6){
                        if(p_d_v_a[z][2]==1&&pos_special==7){
                            pos_special=pos_min;
                            p_d_v_a[z][0]=pos_special;
                            pos_min+=1;
                        }else if(p_d_v_a[z][2]==1&&pos_special!=7){
                            p_d_v_a[z][0]=pos_special;
                            pos_special=7;
                        }
                        else{
                            p_d_v_a[z][0]=pos_min
                            pos_min+=1
                        }
                    }
                }
            }
            }
            console.log("4) calcolate le posizioni finali dei blocchi",p_d_v_a)

            //muovo i blocchi nella posizione corretta e i blocchi con il terzo elemento verranno cancellati dopo esseri arrivati in posizione
            if(invertito){
                p_d_v_a.reverse();
            }
            let gia_un_uno=false;
            for(let h=0;h<4;h++){
                if(p_d_v_a[h][0]!=6&&p_d_v_a[h][1]!=6){
                    if(p_d_v[h][0]!=p_d_v_a[h][0]){
                    move_block(p_d_v[h],tabella[i][h],p_d_v_a[h])
                    }
                    if(p_d_v_a[h][2]==1){
                        if(gia_un_uno){
                            //generi nuovo blocco nella posizione del blocco con valore doppio
                            setTimeout(() => {
                                create_block_with_value(p_d_v_a[h][0],p_d_v_a[h][1],array_con_valori_con_zeri[h]*2)
                            },500)
                            gia_un_uno= !gia_un_uno

                        }else{
                            gia_un_uno= !gia_un_uno
                        }
                        setTimeout(() => {
                            let block_to_be_removed=document.getElementById(`${p_d_v_a[h][0]}-${p_d_v_a[h][1]}-${array_con_valori_con_zeri[h]}`)
                            document.getElementById("griglia_sopra").removeChild(block_to_be_removed);
                        }, 500);
                    }

                }
                console.log(array_con_valori,h);
                console.log(array_con_valori[h])
                tabella[i][h]=array_con_valori[h]
            }
            console.log("5)aggiornata la tabella con i valori corretti e mosso i blocchi nelle posizioni corrette",tabella)
        }
            //aggiorno la tabella
            console.log("tabella aggiornata con il nuovo valore",tabella)
            }
/*------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------SOPRA O SOTTO-------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------
        }else{
            //contralla se inverte
        let invertito= direzione!=0 ? true : false
        for (let i = 0; i<dimension;i++){
            //salvo l'array con i valori
            let array_con_valori_con_zeri=[];
            //salvo la posizione di ogni elemento che ha un valore ogni elemento è un array che contiene i valori [x,y] in realtà l'array diventa una matrice
            let p_d_v=[];
            let p_d_v_v=[];
            //aggiungo i valori che non sono 0 sia nell'array_con_valori sia nella posizione_dei_valori quindi la posizione del valore corrisponde alla posizione nell'array
            for (let j = 0; j<dimension;j++){
                if(tabella[j][i]!=0){
                    array_con_valori_con_zeri.push(tabella[j][i])
                    p_d_v.push([i,j])
                    p_d_v_v.push([i,j])
                }else{
                    array_con_valori_con_zeri.push(tabella[j][i])
                    p_d_v.push([6,6])
                }
            }
            console.log("1)raccolto i dati della riga/colonna",array_con_valori_con_zeri,p_d_v,p_d_v_v)
            //qua inverto i valori per attuare la somma, visto che se sommassi prima di invertire darebbe il risoltato errato
            
            if(invertito){
                array_con_valori_con_zeri.reverse();
                p_d_v.reverse();
            }
            if(p_d_v_v.length!=0){
                if(invertito){
                    p_d_v_v.reverse();
                }

            let array_con_valori=array_con_valori_con_zeri.filter(element => element != 0);
            
            //qua prima di attuare la somma per evitare passaggi inutili controllo che la lunghezza è = a 1 o 0 visto che non si sommerebbe nulla in entrambi i casi
            if(array_con_valori.length!=0&&array_con_valori.length!=1){   
                /*
                Per ogni elemento dell'array controllo se il seguente ha lo stesso valore per sommarli e dando come valore  0 al secondo così da essere ignorato nel controllo. 
                Allo stesso tempo la posizione dei elementi uguali riceve un terzo elemnto con valore 1 con indica che i 2 valori avranno la stessa la posizione alla fine prima di unirsi.              
                
               for(let k=0; k<array_con_valori.length;k++){
                    if(array_con_valori[k]!=0){
                        if(array_con_valori[k]==array_con_valori[k+1]){
                            //"somma" i valori tra il primo e il secondo rendeno il secondo 0
                            array_con_valori[k]=array_con_valori[k]*2
                            array_con_valori[k+1]=0
                            //terzo elemento che indica la loro somma
                            p_d_v_v[k][2]=1
                            p_d_v_v[k+1][2]=1
                            //aggiorno il punteggio del giocatore
                            score+=array_con_valori[k]
                        }
                    }
                }
                //rimuovo i elemnti con 0 così da avere i valori nella posizione corretta prima di riempire i spazi vuoti con i 0
                array_con_valori=array_con_valori.filter(element => element != 0);
            }
            //riempo i possibili spazi bianchi
            for(let l=array_con_valori.length; l<4;l++){
                array_con_valori.push(0)
            }

            //inverto novamente per avere tutti i valori nella posizione giusta
            if(invertito){
                array_con_valori.reverse();
                array_con_valori_con_zeri.reverse();
                p_d_v.reverse();
                p_d_v_v.reverse();
            }
            
            console.log("riga originale",array_con_valori_con_zeri,"2) array dei valori sommati e messi nell'ordine corretto",array_con_valori);

            // Colcolo posizione del posto in base alla posizione e allo stato
            let p_d_v_a = [];

            //unisco p_d_v e p_d_v_v salvando i valori "la terza cooridinata"
            for(let w=0;w<4;w++){
                if(p_d_v[w][1]==6){
                    p_d_v_a.push([6,6])
                }else{
                    for(let g=0;g<p_d_v_v.length;g++){
                        if(p_d_v[w][1]==p_d_v_v[g][1]){
                            p_d_v_a.push(p_d_v_v[g])
                        }
                    }
                }
            }

            console.log("3) p_d_v_a creato e aggiunge le terze cooridinate",p_d_v_a,p_d_v)
            let aggiornare_pos=false
            for(let b=0;b<4;b++){
                if(array_con_valori_con_zeri[b]!=array_con_valori[b]){
                    aggiornare_pos=true
                    break
                }
                
            }
            console.log("da aggiornare la posizione?",aggiornare_pos)
            //calcolo posizioni finali dei blocchi nella riga/colonna
            if(aggiornare_pos){
            if(invertito){
                let pos_max=3
                let pos_special=7;
                p_d_v_a.reverse();
                for(let z=0;z<4;z++){
                    if(p_d_v_a[z][0]!=6){
                        if(p_d_v_a[z][2]==1&&pos_special==7){
                            pos_special=pos_max;
                            p_d_v_a[z][1]=pos_special;
                            pos_max-=1;
                        }else if(p_d_v_a[z][2]==1&&pos_special!=7){
                            p_d_v_a[z][1]=pos_special;
                            pos_special=7;
                        }
                        else{
                            p_d_v_a[z][1]=pos_max
                            pos_max-=1
                        }
                    }
                }
            }else{
                let pos_min=0
                let pos_special=7;
                for(let z=0;z<4;z++){
                    if(p_d_v_a[z][0]!=6){
                        if(p_d_v_a[z][2]==1&&pos_special==7){
                            pos_special=pos_min;
                            p_d_v_a[z][1]=pos_special;
                            pos_min+=1;
                        }else if(p_d_v_a[z][2]==1&&pos_special!=7){
                            p_d_v_a[z][1]=pos_special;
                            pos_special=7;
                        }
                        else{
                            p_d_v_a[z][1]=pos_min
                            pos_min+=1
                        }
                    }
                }
            }
            }
            console.log("4) calcolate le posizioni finali dei blocchi",p_d_v_a)

            //muovo i blocchi nella posizione corretta e i blocchi con il terzo elemento verranno cancellati dopo esseri arrivati in posizione
            if(invertito){
                p_d_v_a.reverse();
            }
            let gia_un_uno=false;
            for(let h=0;h<4;h++){
                if(p_d_v_a[h][0]!=6&&p_d_v_a[h][1]!=6){
                    if(p_d_v[h][1]!=p_d_v_a[h][1]){
                    move_block(p_d_v[h],tabella[i][h],p_d_v_a[h])
                    }
                    if(p_d_v_a[h][2]==1){
                        if(gia_un_uno){
                            //generi nuovo blocco nella posizione del blocco con valore doppio
                            setTimeout(() => {
                                create_block_with_value(p_d_v_a[h][0],p_d_v_a[h][1],array_con_valori_con_zeri[h]*2)
                            },500)
                            gia_un_uno= !gia_un_uno

                        }else{
                            gia_un_uno= !gia_un_uno
                        }
                        setTimeout(() => {
                            let block_to_be_removed=document.getElementById(`${p_d_v_a[h][0]}-${p_d_v_a[h][1]}-${array_con_valori_con_zeri[h]}`)
                            document.getElementById("griglia_sopra").removeChild(block_to_be_removed);
                        }, 500);
                    }

                }
                console.log(array_con_valori,h);
                console.log(array_con_valori[h])
                tabella[i][h]=array_con_valori[h]
            }
            console.log("5)aggiornata la tabella con i valori corretti e mosso i blocchi nelle posizioni corrette",tabella)
        }
            //aggiorno la tabella
            console.log("tabella aggiornata con il nuovo valore",tabella)
            }    
        }
}
function move_block(array_posizion_start,valore_block,array_posizion_final){
    let block_to_be_moved=document.getElementById(`${array_posizion_start[0]}-${array_posizion_start[1]}-${valore_block}`);
    console.log("6)elemento da muovere",block_to_be_moved,"posizione dell'elemento iniziale",array_posizion_start,"posizione dell'elemento finale",array_posizion_final,valore_block)
    //vedere cosa è di sbagliato nel array_position final che da come valore [6,6] al posto della corrretta posizione possibile valore con +=1 da qualche aprte che però è ancora da indivi duare.
    
    let new_postion=calcolo_posizione(array_posizion_final[0],array_posizion_final[1])
    block_to_be_moved.style.transform = `translate(${new_postion[0]}px, ${new_postion[1]}px)`;
    //aggiorno la posizione attraverso la posizione
    block_to_be_moved.id=`${array_posizion_final[0]}-${array_posizion_final[1]}-${valore_block}`
}

function lose(){}*/

