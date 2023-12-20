let numeriTastiera =[];   //Arrai che contiene tutti i numeri che compongono la tastiera di gioco
let bombe =[]  //array che conterrà le bombe o numeri bomba sarà lungo in base alla difficoltà prescelta
let numeriGiocati =[]// array che conterrà inumeri che ho selezionato  se li trovo tutti ho vinto

let tastiera = document.querySelector('.tastiera');  //variabile che contiene il div che sarà il nostro campo di gioco

let gioca = document.querySelector('#gioca') //sara' il nostro bottone di gioco

let gameHover =false

let result = document.querySelector('#result')

 /*
   INIZIO CICLO FOR CHE GENERERA' I NOSTRI 100 NUMERI
 */
for(let i= numeriTastiera.length; i <100; i++){
    let numeroTastiera = Math.floor(Math.random()*(1,100)+1)
    if(!numeriTastiera.includes(numeroTastiera)){
        numeriTastiera.push(numeroTastiera)
    }else {
        i--
    }
}

/*
FINE CICLO FOR
*/

gioca.addEventListener('click',function(){

  let numeriDaInserire = document.querySelector('#difficolta').value //valore imput difficolta numeri da ricrcare per la vittoria
  let bombeDacercare = document.querySelector('#bombs').value // valore imput bombe da inserire nel gioco
  /*
  inizio condizionale che controlla i due valori di imput se diversi da facile medio difficile termina il tutto e la pagina viene ricaricata
  */
  if((numeriDaInserire!='facile')&& (numeriDaInserire!='medio')&& (numeriDaInserire!='difficile')||(bombeDacercare!='facile')&& (bombeDacercare!='medio')&& (bombeDacercare!='difficile')){
    
    alert('parametri non validi')
    location.reload()
  }
   /*
   fine condizionale di controllo
  */
 
   /*
    UTILIZZERO' UNO SWITCH PER DIRE CHE FACILE AVRA TOT BOMBE DIFFICILE TOT MEDIO TOT E IDEM PER I NUMERI
   */

 switch (numeriDaInserire,bombeDacercare) {
    case 'facile':numeriDaInserire=5,bombeDacercare=10
          break;
    case 'medio':numeriDaInserire=15,bombeDacercare=16
          break;
    case 'difficile':numeriDaInserire=30,bombeDacercare=25
          break;
 
    default:
        break;
 }
 //ciclo for che si occupa della creazione dei numeri bomba 

 for(let i = bombe.length; i < bombeDacercare;i++){

    let bomba = Math.floor(Math.random()*(1,100)+1)
    if(!bombe.includes(bomba)){
        bombe.push(bomba)
    } else {
        i--
    }
 }

 //fine ciclo dei numeri bomba

 /*
ora creero un map che permetterà di generare 100 celle con 100 numeri al suo interno insomma genero il gioco
 */

numeriTastiera.map((numero)=>{
  
       let div = document.createElement('div')
       let tag = document.createElement('span')
       let cover = document.createElement('div')
           cover.className='coverCella'
           div.className='cella'
           tag.className='numero'

           tastiera.append(div)
                div.append(tag)
                tastiera.append(cover)
                
                tag.append(numero)
    
div.addEventListener('click',function(){
    div.style.cssText='background-color:black;color:orange'
     if(!gameHover){

        if(!numeriGiocati.includes(numero)){

                if(bombe.includes(numero)){
                     result.innerHTML=`Hai perso mi spiace ! Hai trovato un numero Bomba che era ${numero} tra 5 secondi ricomincerai la partita`
                        cover.style.display='block'
                        
                         gameHover=true
                         setTimeout(() => {
                            location.reload()
                         }, 5000);
                         
                }

            numeriGiocati.push(numero)
        
        } 
   
        if(numeriGiocati.length===numeriDaInserire){
            result.innerHTML=`bravo hai vinto hai completato il livello  i numeri da trovare erano ${numeriDaInserire} e hai trovato questi numeri ${numeriGiocati} tra 5 secondi potrai giocare di nuovo `
            cover.style.display='block'
               setTimeout(() => {
                  location.reload()
               }, 5000);
        }
  
     }
    
})

})
  document.querySelector('#difficolta').value=''
  document.querySelector('#bombs').value=''
  gioca.disabled='true'
})


