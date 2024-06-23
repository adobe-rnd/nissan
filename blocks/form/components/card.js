import { subscribe } from '../util.js';

function getLabel(enumValues, enumNames, index) {
  const title = enumValues?.[index];
  const description = enumNames?.[index] || enumValues?.[index];
  let template = `<div class="card-details">
                        <div class="title">${title}</div>
                        <div class="desc">${description}</div>
                    </div>`;

  if (typeof enumValues[index] === 'object') {
    const {
      modelCode, gradeName, powerTrain, driveTrain, transmission,
    } = enumValues[index] || {};

    template = `<div class="card-details">
                  <span class="title">${modelCode} ${gradeName}</span>
                  <div class="model-details">
                          <span>${powerTrain}</span>
                          <span class="icon-before-chassis">${driveTrain}</span>
                          <span class="icon-before-automatic">${transmission}</span>
                  </div>
              </div>`;
  }

  return template;
}

function updateEnum(fieldDiv, field) {
  fieldDiv.querySelectorAll('.radio-wrapper').forEach((wrapper, index) => {
    const label = wrapper.querySelector('label');
    label.innerHTML = getLabel(field?.enum, field?.enumNames, index);

    const radio = wrapper.querySelector('input');
    radio.style.display = 'none';
    wrapper.classList.add('card');
  });
}

export default function decorate(fieldDiv, field) {
  subscribe(fieldDiv, updateEnum);
  updateEnum(fieldDiv, field);
  return fieldDiv;
}
