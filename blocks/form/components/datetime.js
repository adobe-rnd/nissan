export default function decorate(fieldDiv) {
  const input = fieldDiv.querySelector('input');
  input.type = 'datetime-local';
  return fieldDiv;
}
