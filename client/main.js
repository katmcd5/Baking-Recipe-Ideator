
document.addEventListener('DOMContentLoaded', () => {
  createCheckbox();
  // document.querySelector('body').insertBefore(box, document.querySelector('form'))
});

const ingredients = ['eggs', 'flour', 'vanilla extract', 'baking powder', 'butter', 'sugar', 'baking soda', 'banana', 'chocolate chips'];

function createCheckbox() {
  const box = document.getElementById('box');
  const form = document.createElement('form');
  for (let ing of ingredients) {
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
    let result = [];

    for (let checkbox of checked) {
      if (checkbox.checked) result.push(checkbox.name)
    }
    return result;
}


