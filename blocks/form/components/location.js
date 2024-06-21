import { loadScript } from '../../../scripts/aem.js';

export default function decorate(fieldDiv, field) {
  const input = fieldDiv.querySelector('input');
  if (input) {
    // Load the Google Places API lazily
    loadScript(`https://maps.googleapis.com/maps/api/js?channel=Nissan-GB&key=${field.value}&libraries=places&callback=initAutocomplete`, { async: true, defer: true });

    input.value = '';
    window.initAutocomplete = () => {
      // eslint-disable-next-line no-undef
      const autocomplete = new google.maps.places.Autocomplete(input);

      // Listen for the "place_changed" event and get the place details
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        input.value = place.name;
      });

      input.autocomplete = 'on';
    };
  }

  return fieldDiv;
}
