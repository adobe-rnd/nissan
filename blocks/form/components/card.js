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
  fieldDiv.dataset.enumNotification = true;
  fieldDiv.dataset.enumNamesNotification = true;

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver((mutationsList) => {
    // Look through all mutations that just occured
    const newField = {};
    let update = false;
    mutationsList?.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName.startsWith('data-')) {
        let key = mutation.attributeName.replace('data-', '');
        key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        if (key === 'enum' || key === 'enumNames') {
          newField[key] = JSON.parse(fieldDiv.dataset[key]);
          update = true;
        }
      }
    });
    if (update) {
      updateEnum(fieldDiv, newField);
    }
  });

  // Start observing the target node for configured mutations
  observer.observe(fieldDiv, { attributes: true });

  updateEnum(fieldDiv, field);

  return fieldDiv;
}
