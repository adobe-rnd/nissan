import { getId } from "../util.js";

// eslint-disable-next-line no-unused-vars
export default async function decorate(fieldDiv, field) {
  const labelEl = fieldDiv.querySelector("legend");
  fieldDiv.replaceChildren(labelEl);
  console.log(field.enum);
  const models = field.enum;

  const outerdiv = document.createElement('div');
  outerdiv.classList.add("image-choice-container");
  fieldDiv.appendChild(outerdiv);

  const ul = document.createElement('ul');
  ul.className = 'model-list-wrapper';
  outerdiv.appendChild(ul);
  models && models.forEach(model => {
      let li = document.createElement('li');
      li.className = 'model-block';
      li.tabIndex = '0';

      let input = document.createElement('input');
      input.type = 'radio';
      input.className = 'model-radio';
      input.value = model.id;
      input.id = getId(field.name);
      input.dataset.fieldType = field.fieldType;
      input.name = field.id;
      input.tabIndex = '-1';
      li.appendChild(input);

      let picture = document.createElement('picture');
      let source = document.createElement('source');
      source.srcset = model.source;
      picture.appendChild(source);
      let img = document.createElement('img');
      img.alt = model.name;
      img.src = model.source;
      picture.appendChild(img);
      li.appendChild(picture);

      let label = document.createElement('label');
      label.htmlFor = input.id;
      label.className = 'model-name';
      label.textContent = model.name;
      li.appendChild(label);

      let span = document.createElement('span');
      span.className = 'black-border';
      li.appendChild(span);

      ul.appendChild(li);
  });

  return fieldDiv;
}
