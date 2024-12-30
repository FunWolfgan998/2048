let punteggio=0;
let tabella=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let prev_tabella=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let lastmove=5;
let is_playeble=true;

function Start_game() {
    document.getElementById("Start_game").style.display="none"
    document.getElementById("game").style.display="block"

    generate_table()    
    generate_2_or_4()
    generate_2_or_4()

    update_table()
    console.log(tabella)
}

function generate_table(){
    let table = document.createElement("table")
    for (let i = 0; i<4;i++){
        let tr = document.createElement("tr")
        for (let j = 0; j<4;j++){
            let td = document.createElement("td")
            td.id=`${i}_${j}`
            td.innerText=`${i}_${j}`
            td.value=0
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    document.getElementById("table").appendChild(table)
    console.log(table)
    console.log(tabella)
}

function if_playeble(){
    for(let i=0; i<4; i++){
        for(let j=0; j<4;j++){
            if(i==0&&j==0){
                if((tabella[i+1][j]==0||tabella[i+1][j]==tabella[i][j])||(tabella[i][j+1]==0||tabella[i][j+1]==tabella[i][j])){
                    return true
                }

            }
            if((tabella[i-1][j]==0||tabella[i-1][j]==tabella[i][j])||(tabella[i+1][j]==0||tabella[i+1][j]==tabella[i][j])||(tabella[i][j+1]==0||tabella[i][j+1]==tabella[i][j])(tabella[i][j-1]==0||tabella[i][j-1]==tabella[i][j])){
                
            }
        }}

    return false
}

function update_table(){
    for (let i = 0; i<4;i++){
        for (let j = 0; j<4;j++){
            let td = document.getElementById(`${i}_${j}`)
            td.value=tabella[i][j]
            if(td.value==0){
                td.innerText=" "}
            else{
                td.innerText = td.value
                }
            td.style.backgroundColor=update_color(td.value)
        }
    }
}

function generate_2_or_4(){
    let caselle_vuote = 0;
    let caselle_vuote_posizione = [];
    for (let i = 0; i<4;i++){
        for (let j = 0; j<4;j++){
            if(tabella[i][j]==0){
                caselle_vuote+=1
                caselle_vuote_posizione.push(`${i}_${j}`)}

        }
    }
    if(caselle_vuote!=0 && is_playeble){

    console.log(caselle_vuote_posizione)
    let spazio_scelto=Math.floor(Math.random()*caselle_vuote)
    let due_o_quattro=8;
    Math.floor(Math.random()*10)==4 ? due_o_quattro = 4 : due_o_quattro = 2

    document.getElementById(caselle_vuote_posizione[spazio_scelto]).value = due_o_quattro
   
    let pos = caselle_vuote_posizione[spazio_scelto].split("_")

    tabella[pos[0]][pos[1]]= due_o_quattro
    console.log(pos)
    update_table()
}else{
    alert("hai perso")
    return
}        

}


function move_direction(direction){
    if(direction==3||direction==1){
        for(let i=0; i<4; i++){
            let array=[]
            //creo l'array per ogni riga
            for(let j=0; j<4;j++){
                array.push(tabella[i][j])
            }

            if(direction==1){
                array= flip_array(array)
            }
            let array_pushed=[];

            remove_zeros(array)

            array_pushed=add_same(array)

            remove_zeros(array_pushed)

            if(direction==1){
                array_pushed= flip_array(array_pushed)
            }

            console.log(array_pushed)

            for(let k=0; k<4; k++){
                tabella[i][k]=array_pushed[k]

            }
            console.log(tabella)
        }
    }else{
        for(let r=0; r<4; r++){
            let array=[]
            //creo l'array per ogni riga
            for(let l=0; l<4;l++){
                array.push(tabella[l][r])
            }

            if(direction==2){
                array= flip_array(array)
            }

            remove_zeros(array)

            let array_pushed=[];

            array_pushed=add_same(array)

            remove_zeros(array_pushed)

            if(direction==2){
                array_pushed= flip_array(array_pushed)
            }

            console.log(array_pushed)

            for(let k=0; k<4; k++){
                tabella[k][r]=array_pushed[k]

            }
        } 

    }
    generate_2_or_4()
    check_win()
    update_table()

console.log(tabella)
}

function add_same(array){
    let array_final=[]
    console.log(array)
    array=remove_zeros(array)
    console.log(array)
    for(let i = 0; i<4; i++){
        if(array[i]==array[i+1]){
            array_final.push(array[i]*2)

            punteggio+=array[i]*2

            array[i]=0
            array[i+1]=0

        }else{
            array_final.push(array[i])
        }
    console.log(array_final)
}
    if(array_final.length==4){return array_final}
    for(let k=array_final.length;k<4;k++){
        array_final.push(0)
    }
    return array_final
}

function flip_array(array){
    let max = 3;
    let flipped_array=[]; 
    for(let i = 0; i<4;i++){
        flipped_array.push(array[max])
        console.log(flipped_array)
        max-=1
        console.log(max)
    }

    return flipped_array
    
}

function check_win(){
    for (let i = 0; i<4;i++){
        for (let j = 0; j<4;j++){
            if(tabella[i][j]==2048){
                alert("you Win")
            }
        }
    }
}

function remove_zeros(array){
    let final_array=[];
    for(let i = 0; i<4;i++){
        if(array[i]!=0){
            final_array.push(array[i])
            console.log("qui 1")
            console.log(final_array)
            console.log("qui 2")
        }
    }
    for(let k=final_array.length;k<4;k++){
        final_array.push(0)
    }
    console.log(final_array)
    return final_array
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