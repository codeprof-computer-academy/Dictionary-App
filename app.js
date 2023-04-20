
/* hide welcome screen logic ############################### */

// target welcome screen
let welcome_screen = document.querySelector('.welcome-screen');

document.body.onload = ()=>{
     
      setTimeout(()=>{
        welcome_screen.classList.add('hide-welcome-screen')
      },3000)
  
}

// show nav logic starts here
// target the nav 
let navbar = document.querySelector('nav');

// target the menu btn
let menu_btn = document.querySelector('.menu')

menu_btn.addEventListener('click', (event)=>{
    event.preventDefault();
    navbar.classList.toggle('show-nav')

})


// change theme logic

// target the theme-span
let theme_span = document.querySelector('.theme')
let theme_btn = document.querySelector('.theme-btn')
let main = document.querySelector('main')
let search = document.querySelector('#search')
let text_input = document.querySelector('input')

// add event listener to the theme-span
theme_span.addEventListener('click', (event)=>{
  event.preventDefault()
    theme_btn.classList.toggle('slide-right');
    main.classList.toggle('dark-theme-main')
    search.classList.toggle('dark-theme-section')
    text_input.classList.toggle('dark-theme-input')
    document.querySelector('.search-icon').classList.toggle('dark-theme-search-icon')
    document.querySelector('.text').classList.toggle('dark-theme-input');

    document.querySelector('.audio').classList.toggle('dark-theme-section')
    
   

})



// logic for clicking the search btn
 // target  the search btn
 let search_btn = document.querySelector('.search-btn');
 search_btn.addEventListener('click', (event)=>{
     event.preventDefault()

     // Checking to make sure user enters a word
let text_value = text_input.value
  if(text_value === ''){
       text_input.classList.add('shake')
       setTimeout(()=>{
           text_input.classList.remove('shake')
       },1000)
  }else{

    let word_box = document.querySelector('.word-box')
    word_box.innerHTML = ''
    
    //  create the word span
         let word_span = document.createElement('span');
         word_span.classList.add('word');
         word_span.innerHTML = text_value;
         word_box.appendChild(word_span)


      // fetching data from API
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+text_value).then((res)=>{
      return res.json()
  
  }).then((data)=>{
 

    // grab the phonetic array 
    let phonetic_symbol_arr = data[0].phonetics

    // go through each  element (object) inside the phonetic_symbol array, and look for the first element (object) that has property text  using your find() method

    let phonetic_symbol = phonetic_symbol_arr.find((symbol)=>{
          return(symbol.text)

    })

    let word_symbol = phonetic_symbol.text;
    // create phonetic  span
    let phonetic_span = document.createElement('span');
    phonetic_span.classList.add('phonetic');
    phonetic_span.innerHTML = word_symbol;

    word_box.appendChild(phonetic_span)
    
    
    // the logic to grab the meanings
    let meaning_array = data[0].meanings;
    let counter = 1;
    // target the maening box
    let meaning_box = document.querySelector('.meanings')

    // target the synonym  and antonym span
    let synonym_span = document.querySelector('.synonym')
    synonym_span.innerHTML = 'Synonyms: '
    let antonym_span = document.querySelector('.antonym')
    antonym_span.innerHTML = 'Antonyms: '

  



    meaning_array.forEach((meaning)=>{
        //  create p meaning 
        let p_meaning = document.createElement('p');
        p_meaning.classList.add('meaning');
        meaning_box.appendChild(p_meaning)

        // create meaning number span
        let meaning_num_span = document.createElement('span');
        meaning_num_span.classList.add('meaning-no');
        
        meaning_num_span.innerHTML = "Definition " + counter++
        p_meaning.appendChild(meaning_num_span)

        // creating span for the part of speech
        let pos_span = document.createElement('span');
        let bold = document.createElement('b');
        bold.innerHTML = "Part of Speech: " + meaning.partOfSpeech
        pos_span.appendChild(bold);
        p_meaning.appendChild(pos_span)

         for(let def of meaning.definitions){
              // create span to hold meaning
              let meaning_span  = document.createElement('span');
              meaning_span.innerHTML = def.definition
              p_meaning.appendChild(meaning_span)
         }

      
        
             
             
             if(meaning.synonyms.length === 0){
                synonym_span.innerHTML += ""
                
              }else{
                synonym_span.innerHTML += meaning.synonyms[0]
              }
        

             
             if(meaning.antonyms.length === 0){
                 antonym_span.innerHTML += ""
                 
             }else{
                antonym_span.innerHTML += meaning.antonyms[0]
             }
         

    })
   
    


    // audio logic starts here 
    // get the phonetics length
    let phonetics_array = data[0].phonetics
  
    let audio_src = phonetics_array.find((phonetic)=>{
         return(phonetic.audio !== '')
    })
  
    // target the audio src 
    document.querySelector('.word-audio').src = audio_src.audio
   
    
  }).catch((err)=>{
      console.log("Ooops! Error occured while fetching from API")
      console.log(err)
      document.querySelector('.word-audio').src = "not-found.mp3"
  })
  }

 })


