import { subscribe } from '../util.js';

function getLabel(enumValues, enumNames, index) {
  let title = enumValues?.[index];
  let description = enumNames?.[index] || enumValues?.[index];
  if (typeof enumValues[index] === 'object') {
    const {
      modelCode, gradeName, powerTrain, driveTrain, transmission,
    } = enumValues[index] || {};
    title = `${modelCode} ${gradeName}`;
    description = `${powerTrain} ${driveTrain} ${transmission}`;
  }
  const template = `<div class="card-details">
                        <div>${title}</div>
                        <div>${description}</div>
                    </div>`;

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
