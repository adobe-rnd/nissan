export default function decorate(fieldDiv, field, htmlForm) {
  fieldDiv.querySelectorAll('label').forEach((label, index) => {
    const div = document.createElement('div');
    const title = document.createElement('span');
    title.textContent = field?.enum?.[index];
    div.appendChild(title);

    const description = document.createElement('span');
    description.textContent = field?.enumNames?.[index];
    div.appendChild(description);

    label.innerHTML = '';
    label.appendChild(div);
  });

//   window.setTimeout(async () => {
//     myForm.subscribe((e) => {
//       debugger;
//     }, 'fieldChanged');
//   }, 1000);

  return fieldDiv;
}
