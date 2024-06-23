export default function decorate(fieldDiv, field) {
  const template = `
            <div class="select-dealer-container">
            <div class="details">
                <h3>Glyn Hopkin Ltd (Chelmsford)</h3>
                    <p class="dealer-list-phone"><a class="dealer-list-phone-link" href="tel:01245960130">01245 960130</a></p>
                <p class="address">9 Bilton Road, Waterhouse Lane<br>Chelmsford</p>
                    <p class="distance">(20.4 miles)</p>
            </div>
            <div class="select-dealer-cta-container">
                <button class="select-dealer-cta" type="button">Select this dealership</button>
            </div>
        </div>
    `;

  const fragment = document.createDocumentFragment();
  fragment.innerHTML = template.trim();
  fieldDiv.appendChild(fragment);

  return fieldDiv;
}
