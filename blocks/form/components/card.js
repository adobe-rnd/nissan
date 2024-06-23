import { subscribe } from '../util.js';

function updateEnum(fieldDiv, field) {
  fieldDiv.querySelectorAll('.radio-wrapper').forEach((wrapper, index) => {
    const label = wrapper.querySelector('label');
    const div = document.createElement('div');
    div.className = 'card-details';
    const title = document.createElement('div');
    title.textContent = field?.enum?.[index];
    div.appendChild(title);

    const description = document.createElement('div');
    description.textContent = field?.enumNames?.[index] || field?.enum?.[index];
    div.appendChild(description);

    label.innerHTML = '';
    label.appendChild(div);

    const radio = wrapper.querySelector('input');
    radio.style.display = 'none';
    wrapper.classList.add('card');
  });
}

export default function decorate(fieldDiv, field) {
  subscribe(fieldDiv, ['enum', 'enumNames'], updateEnum);
  updateEnum(fieldDiv, field);
  return fieldDiv;
}
