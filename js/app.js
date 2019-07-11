function startApp() {
  loadData();
  attachListeners();
}

function loadData() {
  $.get('/data/page-1.json', (images) => {
    if(images.length){
      // success function
      displayPage(images);
      createKeywords(images);
    }
    else{
      //  faliure message
      console.log('error');
    }
  },'json');
}

function displayPage(images) {
  images.forEach( (image) => {
    const $newImage = $('#photo-template').clone();

    $newImage.find('h2').text(image.title);
    $newImage.find('img').attr('src',image.image_url);
    $newImage.find('p').text(image.keyword);
    $newImage.find('img').attr('alt', image.description);
    $newImage.removeAttr('id');
    $('main').append($newImage);
  })
}

function createKeywords(images) {
  let keywords = [];
  //iterate over each item in the array
  images.forEach( (image) => {
    let currentKeyword = image.keyword;
    //check to see if the keyword exists in a keywords array
    //if not, push to keywords array
    if(!keywords.includes(currentKeyword)){
      keywords.push(currentKeyword);
      //if so, do nothing
    } else {
      console.log("Keyword exists");
    }
  })
  //create dom element for all keywords in keyword array
  for (let i = 0; i < keywords.length; i++) {
    //create new option element
    const $newOption = $('#option-template').clone();
    //add info to the option element
    $newOption.attr('value', keywords[i]);
    $newOption.text(keywords[i]);
    $newOption.removeAttr('id');
    //find the select Dom element
    //append option element as a child to select
    $('select').append($newOption);
  }
}

function attachListeners() {
  $('select').on('change', (event) => {
    const $choice = $(event.target);
    const value = $choice.val();

    if (value === 'default'){
      $('section').show();
    } else {
      console.log(value);
      //if image.keyword == value, show the image
      $('section').each( function(el) {
        //for each child of main, check the value of text in the p tag
        const $section = $(this);
        console.log($(this));
        let text = $section.find('p').text();
        console.log(text);
        //if text == value
        console.log('this is value', value)
        console.log('this is text', text)
        if (text === value) {
          $section.show();
        } else {
          $section.hide();
        }
      })
    }
  })
}
  
  
  
  


$(startApp);
