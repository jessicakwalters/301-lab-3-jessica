
let imagesPage1 = [];
let imagesPage2 = [];

function startApp() {
  createData('/data/page-2.json', imagesPage2);
  createData('/data/page-1.json', imagesPage1);
  attachListeners();
  buttonListner();
}

function createData(filePath, imagesArray) {
  $.get(filePath, (images) => {
    if(images.length){
      images.forEach( (imageObject) => {
        imagesArray.push(new Image(imageObject));
      })
    }
    else{
      //  faliure message
      console.log('error');
    }
  },'json')
  .then( () => {
  loadData(imagesArray);
  });
}

function loadData(arr) {
  //remove any children
  $('#container').children().remove();
  //append new objects
  console.log("Array: ", arr);
  arr.forEach( (image) => {
    $('#container').append(image.tohtml());
  })
  createKeywords(arr);
}

function createKeywords(images) {
  let keywords = [];
  $("#option-template").siblings().remove();
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

function buttonListner() {
  $('button').on('click', (event) =>{
    // hide section slements
    $('.flexitem').hide();
    // grab value from button
    const $button = $(event.target);
    const text = $button.text();
    let arr;
    //if text is page1 choose imagesPage1, if page2 choose imagesPage2
    if (text == 'page1') {
      arr = imagesPage1 ;
    } else if (text == 'page2'){
      arr= imagesPage2;
    }
    loadData(arr);
  });
}

//constuctor
function Image(rawDataObject) {
  for (let key in rawDataObject) {
    this[key] = rawDataObject[key];
  }
}

Image.prototype.tohtml = function () {
  //get templat
  let template = $('#photo-template').html();
  //handlebars compile
  let templateRender = Handlebars.compile(template);
  //return the html
  return templateRender(this);
}

$(startApp);
