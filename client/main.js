
document.addEventListener('DOMContentLoaded', () => {
  createCheckbox();
});

const ingredients = [
  'apples',          'baking powder',
  'baking soda',     'banana',
  'blueberries',     'brown sugar',
  'butter',          'carrots',
  'chocolate chips', 'cinnamon',
  'cocoa powder',    'coffee',
  'cream cheese',    'eggs',
  'flour',           'heavy cream',
  'lemon',           'molasses',
  'nutmeg',          'pie crust',
  'salt',            'strawberries',
  'sugar',           'vanilla extract',
  'vegetable oil'
]

function createCheckbox() {
  //create container
  const box = document.getElementById('box');

  const question = document.createElement('div');
  question.innerText = 'Check all the ingredients you\'ve got in your pantry.';
  question.setAttribute('id', 'prompt');
  box.appendChild(question);
  //create form
  const form = document.createElement('form');
  for (let ing of ingredients) { //create checkbox divs
    const miniBox = document.createElement('div');
    miniBox.id = 'miniBox';
    miniBox.setAttribute('class', 'ingredient');
    //create checkbox itself
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('ingredient');
    checkbox.name = ing;
    checkbox.id = ing;
    //create label for each checkbox
    let boxLabel = document.createElement('label');
    boxLabel.htmlFor = ing; //link label to checkbox
    const text = document.createTextNode(`${ing}`);

    //append it all
    boxLabel.appendChild(text);
    miniBox.appendChild(checkbox);
    miniBox.appendChild(boxLabel);
    form.appendChild(miniBox);
  }
  //append form to box container
  box.appendChild(form);

  function submitButton() {
    //create submit button
    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.id = 'submitButton';
    //create button label
    const text = document.createTextNode('Submit');
    submit.appendChild(text);

    form.appendChild(submit);
    submit.addEventListener('click', onClick);
  }
  //call function
  submitButton();

  function randomButton() {
    const random = document.createElement('button');
    random.setAttribute('type', 'submit');
    random.id = 'randomButton';
    const text = document.createTextNode('Random');
    random.appendChild(text);
    form.appendChild(random);
    random.addEventListener('click', randomClick);
  }

  randomButton();
}


function onClick(e) {
    e.preventDefault(); //prevents auto refresh
    let checked = document.querySelectorAll('.ingredient');
    let ingredients = [];
    for (let checkbox of checked) {
      if (checkbox.checked) ingredients.push(checkbox.name);
      checkbox.checked = false;
    }

    const formData = new FormData();
    formData.append("ingredients", JSON.stringify(ingredients));

    //AJAX post method
    fetch('/ingredients', {
      method: 'POST',
      body: formData
    })
      .then(data => data.json())
      .then(data => recipePop(data))
    
}

function randomClick(e) {
  e.preventDefault(); //prevents auto refresh
  fetch('/random')
    .then(data => data.json())
    // .then(data => console.log(data))
    .then(data => recipePop(data))

}


function recipePop(arr) {
  if (arr.length === 0) alert('No recipes match! Please restock your ingredients.');

  let name;
  let link;
  let food;

  if (arr.length === 1) {
    name = arr[0].name;
    link = arr[0].link;
    food = arr[0].image;
  }
  else {
    const randomIndex = Math.floor(Math.random()*arr.length);
    console.log(arr[randomIndex]);
    name = arr[randomIndex].name;
    // console.log(name);
    link = arr[randomIndex].link;
    // console.log(link);
    food = arr[randomIndex].image;
  }
  

  //create pop up div
  const recipe = document.createElement('div');
  recipe.setAttribute('class', 'recipe');

  //create delete button on pop up
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'delete');
  const text = document.createTextNode('X');
  deleteButton.appendChild(text);
  deleteButton.addEventListener('click', () => recipe.remove());
  recipe.appendChild(deleteButton);

  //create hyperlink div
  const tagBox = document.createElement('div');
  tagBox.setAttribute('class', 'link');
  //create hyperlink
  const tag = document.createElement('a');
  tag.setAttribute('href', `${link}`);
  tag.setAttribute('target', '_blank');
  tag.innerText = `You can make ${name}!`;
  tagBox.appendChild(tag);
  recipe.appendChild(tagBox);

  //create image div
  const image = document.createElement('img');
  image.setAttribute('src', `${food}`);
  image.setAttribute('class', 'image');
  recipe.appendChild(image);

  document.body.appendChild(recipe);

}


