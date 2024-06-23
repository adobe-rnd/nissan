import { getId } from '../util.js';

// eslint-disable-next-line no-unused-vars
export default async function decorate(fieldDiv, field) {
  const labelEl = fieldDiv.querySelector('legend');
  fieldDiv.replaceChildren(labelEl);
  const models = field.enum;

  const outerdiv = document.createElement('div');
  outerdiv.classList.add('image-choice-container');
  fieldDiv.appendChild(outerdiv);

  const ul = document.createElement('ul');
  ul.className = 'model-list-wrapper';
  outerdiv.appendChild(ul);
  if (models) {
    models.forEach((model) => {
      const li = document.createElement('li');
      li.className = 'model-block';
      li.tabIndex = '0';

      const input = document.createElement('input');
      input.type = 'radio';
      input.className = 'model-radio';
      input.value = model.id;
      input.id = getId(field.name);
      input.dataset.fieldType = field.fieldType;
      input.name = field.id;
      input.tabIndex = '-1';
      li.appendChild(input);

      const picture = document.createElement('picture');
      const source = document.createElement('source');
      source.srcset = model.source;
      picture.appendChild(source);
      const img = document.createElement('img');
      img.alt = model.name;
      img.src = model.source;
      picture.appendChild(img);
      li.appendChild(picture);

      const label = document.createElement('label');
      label.htmlFor = input.id;
      label.className = 'model-name';
      label.textContent = model.name;
      li.appendChild(label);

      ul.appendChild(li);
    });
  }

  return fieldDiv;
}
