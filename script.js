const memory_wrapper = document.querySelector('.memory-wrapper');
const start_button = document.querySelector('.start-button');
const average = document.querySelector('.average-wrapper');
const image_set = document.querySelector('#images-set');

/* default settings*/
average.style.setProperty('background-image', 'url(./varios/totorobosque.jpg)')

let image_array = ['shihiro.jpg','brujita.jpg','casaarbol.jpg','castillo_en_el_cielo.jpg','chicadragon.jpg','girasol.jpg','geisha.jpg','pareja.jpg','nocturno.jpg','shhiro2.jpg'];;

/*TIMER CODE*/
const timer = document.querySelector('.memory-timer');
let hour = 0;
let minutes = 0;
let seconds = 0;

const startTimer = ()=>{
    if(seconds < 59){
        seconds += 1;
    }else if(minutes < 59){
        seconds = 0;
        minutes += 1; 
    }else{
        hour += 1;
    }
  timer.textContent =`${hour}:${minutes}:${seconds}`;   
}

let timer_interval;

const resetTimer = ()=>{
    clearInterval(timer_interval);
    hour = 0;
    minutes = 0;
    seconds = 0;
   timer.textContent =`${hour}:${minutes}:${seconds}`;   
}

/* MEMORYCARDS CODE */

const createMemoryCards = (num)=>{
    let cards = 0;
    while(cards<num){
        let card = document.createElement('div');
        card.classList.add('memory-cards');
        card.classList.add('memory-cards-images');
        memory_wrapper.appendChild(card);
        cards++;
    }
};

createMemoryCards(20);

const removeMemoryCards = (num)=>{
    let cards = 0;
    while(cards<num){
        memory_wrapper.removeChild(memory_wrapper.firstChild);
        cards++;
    }
};

const startFunc = (array)=>{
// scores = [...scores];//by reference to hold values of others games
const array_of_images = array;
const randomNum = ()=>{ 
    let random_num = Math.round(Math.random()*9);
    return random_num;
}

// mix de index of the array to display the images 
const randomImages = ()=>{
    let r_num = randomNum();
    let random_array = [];
    random_array.push(r_num);
// console.log(random_array.some(num=>num==r_num));
    for(let i = 0; i < 9; i++){
        while(random_array.some(num=>num==r_num)){
          r_num = randomNum();
       } 
      random_array.push(r_num);
      r_num = randomNum();
    }
  return random_array;
}

let memory_cards = document.querySelectorAll('.memory-cards-images');
console.log( memory_cards.length)
memory_cards.forEach(mc=>mc.style.setProperty('background-size', 'cover'))


//create an object to map the images position
let imagesPositions = {};

/* display the images for 1,5 seconds and fill the imagesPosition object*/
const setCardImages = ()=>{
    let randomIndexes = randomImages();  
    randomIndexes = [...randomIndexes, ...randomImages()]//make an array with pairs of values
    console.log(randomIndexes);

     for(let i = 0; i < 20; i++){
          memory_cards[i].style.setProperty('background-image', `url(./varios/${array_of_images[randomIndexes[i]]})`);
          memory_cards[i].style.setProperty('background-position', 'top center');
          imagesPositions[i] = `url(./varios/${array_of_images[randomIndexes[i]]})`;
      }
   /* hidde the images by setting to void the url() address */   
      setTimeout(()=>{
        memory_cards.forEach((card)=>{
            card.style.setProperty('background-image', '');
        })
      }, 500)
      return imagesPositions;
}

const average = document.querySelector('.average-wrapper');
/*create the average panel to show scores*/
function  windFunc(){
    time = timer.textContent.valueOf()
    clearInterval(timer_interval);
    timer.textContent = time;

    // let div = document.createElement('div');
     let span = document.createElement('span');
     span.classList.add('average');
     span.textContent = `Time: ${time}`;
     average.appendChild(span);
    //  average.appendChild(div);
}

// windFunc()

/* Reload the imagesPostion object */
imagesPosition = { ...setCardImages() };
console.log(imagesPosition);

/*create a reference card object to hidde or match the cards*/
const last_card = {
    index: 0,
    card: 'something',
};
/*create a match counter to determine when the game´s end*/
let match_counter = 0;
/*create a booleam value to determine when set to void the previous image*/
let bool_val = false;
/*store_cards matches to discard the show/hidde event if they are in*/
let store_cards = [];
/*show the card selected*/
const showCard = (event, index)=>{
    let actual_card =  `${imagesPositions[index]}`;
    let show_hidde = store_cards.some((n)=>n==index);
if(!show_hidde){
    if(actual_card == last_card.card && index != last_card.index){
        memory_cards[index].style.setProperty('background-image', `${imagesPositions[index]}`);
        match_counter += 1;
        (match_counter == 10)? windFunc() : null;
        bool_val = true;
        store_cards.push(index);
        store_cards.push(last_card.index);
       return;
    }else if(index != last_card.index){
    /*hidde the previous card if it's not the same*/
      (!bool_val)?   memory_cards[last_card.index].style.setProperty('background-image','') : null;
         event.target.style.setProperty('background-image', `${imagesPositions[index]}`)
        last_card.index = index;
        last_card.card = `${imagesPositions[index]}`;
        bool_val = false; 
    }else if(index == 0 && match_counter == 0){
        memory_cards[index].style.setProperty('background-image', `${imagesPositions[index]}`);
        last_card.index = index;
        last_card.card = `${imagesPositions[index]}`;
        bool_val = false; 
    }    
}else{
    return;
}
}

/*create a Listener for each card*/
memory_cards.forEach((card, index)=>card.addEventListener('click', function(e){
    showCard(e, index);
})) 
}//end of startFunc

/*restart function*/
const restartFunc = ()=>{

  let memory_cards = document.querySelectorAll('.memory-cards-images');
     memory_cards.forEach((card)=> card.style.setProperty('background-image', ''));
  let average = document.querySelector('.average');
  if(average)  average.textContent = '';   
 }

let start = false;
/*select set of images*/
image_set.addEventListener('change', ()=>{
    switch(image_set.value){
     case "1": image_array = ['shihiro.jpg','brujita.jpg','casaarbol.jpg','castillo_en_el_cielo.jpg','chicadragon.jpg','girasol.jpg','geisha.jpg','pareja.jpg','nocturno.jpg','shhiro2.jpg'];
        average.style.setProperty('background-image', 'url(./varios/totorobosque.jpg)')
        break;
     case "2": image_array = ['angelcaido-moebius.jpg','budatecnotronico-moebius.jpg','elprincipito-moebius.jpg','eyaculacionesprivadas-moebius.jpg','emperatrizdeldesierto-moebius.jpg', 'facesdetritus-moebius.jpg','flechainversasindestino-moebius.jpg', 'gopitrivalfueradeltiempo-moebius.jpg','intoleranciadivina-moebius.jpg','irrelevanciasgalacticas-moebius.jpg'];
        average.style.setProperty('background-image', 'url(./varios/soliloquiosdeuvagabundo-moebius.jpg)')
        break;
     case "3": image_array = ['soliloquiosdeuvagabundo-moebius.jpg', 'urbanninja-anime.jpg','Transportingcoffeshop-moebius.jpg','Rubysombraladespertar-anime.jpg','Rubyflashes-anime.jpg','sexnaenelbosquedelasgruyasdepiedra-anime.jpg','shangking-moebius.jpg','juegosdesombras-anime.jpg','fire&ice-frazetta.jpg','Augurio-frazetta.jpg'];
        average.style.setProperty('background-image', 'url(./varios/wisperintheocean-frazetta.jpg)')
        break; 
    }
 if(start){
    restartFunc()
    removeMemoryCards(20);
    createMemoryCards(20);
    resetTimer();
    start = !start;
    start_button.textContent = 'Start';
 }
})

start_button.addEventListener('click', function(){
    if(!start){
        startFunc(image_array)
        timer_interval = setInterval(()=>startTimer(),1000);
        start = !start;
        start_button.textContent = 'Reset';
    }else{
        restartFunc()
        removeMemoryCards(20);
        createMemoryCards(20);
        resetTimer();
        start = !start;
        start_button.textContent = 'Start';
    }
})