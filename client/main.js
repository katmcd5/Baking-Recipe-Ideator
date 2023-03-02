
document.addEventListener('DOMContentLoaded', () => {
  createCheckbox();
  // document.querySelector('body').insertBefore(box, document.querySelector('form'))
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
    miniBox.setAttribute('class', 'ingredient')
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('ingredient');
    checkbox.name = ing;
    checkbox.id = ing;
    let boxLabel = document.createElement('label');
    boxLabel.htmlFor = ing;
    const text = document.createTextNode(`${ing}`)
    boxLabel.appendChild(text);
    miniBox.appendChild(checkbox);
    miniBox.appendChild(boxLabel);
    form.appendChild(miniBox);
  }
  box.appendChild(form);
  // form.action = '/ingredient';
  // form.method = 'POST';

  function submitButton() {
    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.id = 'submitButton';
    // submit.setAttribute('onclick', onClick(event))
    const text = document.createTextNode('Submit');
    submit.appendChild(text);
    const linebreak = document.createElement("br");
    form.appendChild(linebreak);
    form.appendChild(submit);
    form.addEventListener('submit', onClick);
  }
  submitButton();
}


function onClick(e) {
    e.preventDefault();
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
      // .then(data => alert(data[0].name, data[0].link))
    
}

function recipePop(obj) {
  const name = obj[0].name;
  const link = obj[0].link;
  const food = obj[0].image;
  const recipe = document.createElement('div');
  recipe.setAttribute('id', 'recipe');
  const tag = document.createElement('a');
  tag.setAttribute('href', `${link}`);
  tag.setAttribute('target', '_blank');
  tag.innerText = `You can make ${name}!`;
  recipe.appendChild(tag);
  const image = document.createElement('img');
  image.setAttribute('src', `${food}`);
  image.setAttribute('class', 'image');
  recipe.appendChild(image);
  document.body.appendChild(recipe);
}


