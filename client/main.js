
document.addEventListener('DOMContentLoaded', () => {
  const title = document.createElement('h1');
  title.innerText = 'HELLO';
  document.querySelector('body').insertBefore(title, document.querySelector('form'))
});

function submit(e) {
  e.preventDefault();
  const submitted = document.getElementById('ingredients');
  const ingredientsList = submitted.elements.namedItem("ingredients").value;
  
}