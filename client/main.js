
document.addEventListener('DOMContentLoaded', () => {
  createCheckbox();
  // document.querySelector('body').insertBefore(box, document.querySelector('form'))
});

const ingredients = ['eggs', 'flour', 'vanilla extract', 'baking powder', 'butter', 'sugar', 'baking soda', 'banana', 'chocolate chips'];

function createCheckbox() {
  const box = document.getElementById('box');

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
    checkbox.id = 'ingredient';
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
      if (checkbox.checked) ingredients.push(checkbox.name)
    }
    console.log(ingredients);

    const formData = new FormData();
    ingredients.forEach((item) => formData.append("ingredients", JSON.stringify(ingredients)))

    fetch('/ingredients', {
      method: 'POST',
      body: formData
    })
      .then(data => data.json())
      .then(data => console.log(data))
    
}


