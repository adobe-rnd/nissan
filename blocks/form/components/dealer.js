import { subscribe } from '../util.js';

function updateView(fieldDiv, field) {
  const removeDealerDetails = () => {
    const oldDealerDetails = fieldDiv.querySelector('.dealer-details');
    if (oldDealerDetails) {
      oldDealerDetails.remove();
    }
  };
  if (field.value) {
    const {
      name,
      contact: { phone } = {},
      address: { addressLine1, city } = {},
    } = field?.value || {};
    const template = `
          <div class="dealer-details">
              <p class="dealer-name">${name || 'Dealer Name'}</p>
              <p class="dealer-list-phone"><a class="dealer-list-phone-link" href="tel:${phone}">${phone || '012 3456 7890'}</a></p>
              <p class="address">${addressLine1 || 'Address'}<br>${city || 'City'}</p>
              <p class="distance">(20.4 miles)</p>
          </div>`;
    removeDealerDetails();
    fieldDiv.innerHTML += template.trim();
  } else {
    removeDealerDetails();
  }
}

export default function decorate(fieldDiv, field) {
  subscribe(fieldDiv, updateView);
  fieldDiv.dataset.valueNotification = true;
  updateView(fieldDiv, field);
  const input = fieldDiv.querySelector('input');
  if (input) {
    input.style.display = 'none';
  }

  return fieldDiv;
}
