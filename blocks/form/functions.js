const powertrainConfigurations = [
  {
    rank: '1',
    powertrain: '100% Electric',
    description: 'Entirely powered by an electric motor using a battery ',
  },
  {
    rank: '2',
    powertrain: 'e-POWER',
    description: 'A combination of a petrol engine which charges the battery and an electric motor that turns wheels ',
  },
  {
    rank: '3',
    powertrain: 'Hybrid',
    description: 'Powered by a combination of a petrol engine and an electric motor',
  },
  {
    rank: '4',
    powertrain: 'Petrol Mild Hybrid',
    description: 'Powered by a petrol engine supported by a battery during acceleration and cruising',
  },
  {
    rank: '5',
    powertrain: 'Petrol',
    description: 'Powered by a conventional petrol engine',
  },
  {
    rank: '6',
    powertrain: 'Diesel',
    description: 'Powered by a conventional diesel engine',
  },
];

const carModels = [
  {
    id: 'JUKEF16B',
    name: 'New Nissan Juke',
    source: '/content/dam/forms-poc/nissan/juke.png',
    powertrain: ['Hybrid', 'Petrol'],
  },
  {
    id: 'QASHQAIJ12B',
    name: 'New Nissan Qashqai',
    source: '/content/dam/forms-poc/nissan/qashqai.png',
    powertrain: ['Petrol Mild Hybrid', 'e-POWER'],
  },
  {
    id: 'XTRAILT33B',
    name: 'Nissan X-Trail',
    source: '/content/dam/forms-poc/nissan/x-trail.jpg',
    powertrain: ['Petrol Mild Hybrid', 'Diesel'],
  },
  {
    id: 'LEAFZE1A',
    name: 'Nissan LEAF',
    source: '/content/dam/forms-poc/nissan/leaf.jpg',
    powertrain: ['100% Electric'],
  },
  {
    id: 'ARIYAFE0A',
    name: 'Nissan ARIYA',
    source: '/content/dam/forms-poc/nissan/ariya.jpg',
    powertrain: ['100% Electric'],
  },
  {
    id: 'QASHQAIJ12A',
    name: 'Nissan Townstar',
    source: '/content/dam/forms-poc/nissan/townstar.jpg',
    powertrain: ['Petrol Mild Hybrid', 'e-POWER'],
  },
];

const carModelsMap = carModels.reduce((acc, model) => {
  acc[model.id] = model;
  return acc;
}, {});

const powertrainConfigMap = powertrainConfigurations.reduce((acc, powertrain) => {
  acc[powertrain.powertrain] = powertrain;
  return acc;
}, {});

/**
 * Populates the image choice component with the given options
 * @param {object} imageChoiceField
 * @param {scope} globals
 */
function populateImageChoice(imageChoiceField, globals) {
  globals.functions.setProperty(imageChoiceField, { enum: carModels });
}

/**
 * Populates the image choice component with the given options
 * @param {*} chooseModel
 * @param {object} imageField
 * @param {object} modelName
 * @param {object} powerTrainField
 * @param {scope} globals
 */
function populateSelectedModel(chooseModel, imageField, modelName, powerTrainField, globals) {
  // get model details based on the selected model (modelChoiceField)
  const selectedModel = carModelsMap[chooseModel];
  const enumNames = [];
  const enumValues = [];

  if (!selectedModel) {
    return;
  }
  selectedModel.powertrain.forEach((powertrain) => {
    if (powertrainConfigMap[powertrain]) {
      enumNames.push(powertrainConfigMap[powertrain].description);
      enumValues.push(powertrain);
    }
  });

  globals.functions.setProperty(
    imageField,
    { value: selectedModel.source },
  );
  globals.functions.setProperty(
    modelName,
    { value: selectedModel.name },
  );
  globals.functions.setProperty(
    powerTrainField,
    { enum: enumValues, enumNames },
  );
  globals.functions.setProperty(
    powerTrainField,
    { value: enumValues[0] },
  );
}

/**
 * Populates the dealership field with the given options
 * @param {*} model
 * @param {*} location
 * @param {*} powerTrain
 * @param {object} list
 * @param {object} dealerPanel
 * @param {object} title
 * @param {scope} globals
 */
async function populateDealership(model, location, powerTrain, list, dealerPanel, title, globals) {
  if (model && location && powerTrain) {
    const response = await fetch(`https://publish-p51113-e1377975.adobeaemcloud.com/content/nissan-forms-poc/dealerships.html?modelCode=${model}&powerTrain=${powerTrain}`);
    if (response.ok) {
      const result = await response.json();
      const dealers = result.dealers || [];
      globals.functions.setProperty(
        list,
        { value: dealers },
      );
      globals.functions.setProperty(
        dealerPanel,
        { label: { value: `Showing ${dealers.length} dealerships` } },
      );

      const name = carModelsMap[model] ? carModelsMap[model].name : '';
      globals.functions.setProperty(
        title,
        { value: `with a ${name} ${powerTrain} available` },
      );
    }
  }
}

/**
 * Populate the vehicle details
 * @param {*} dealer
 * @param {object} vehicle
 * @param {scope} globals
 */
function populateVehicleDetails(dealer, vehicle, globals) {
  let vehicles = [];
  let selectedVehicle = null;
  if (dealer && dealer.vehicles && dealer.vehicles.length > 0) {
    vehicles = dealer.vehicles;
    [selectedVehicle] = vehicles;
  }
  globals.functions.setProperty(
    vehicle,
    { enum: vehicles, value: selectedVehicle },
  );
}

function submitSuccesss() {
  window.parent.location.href = 'https://main--nissanleaf--adobehols.hlx.live/thank-you-testdrive-booked';
}

function submitFailure(response, error) {
  if (response) console.log(`Submission failed with ${response.status} error code`, response.statusText);
  if (error) console.log('Submission failed with error', error);
}

/**
 * Submit the form
 * @param {string} Http endpoint to submit.
 * @param {scope} globals
 */
function submitToRestEndpoint(url, globals) {

  window.parent.location.href = "https://main--nissanleaf--adobehols.hlx.live/thank-you-testdrive-booked";
  
  /*
  const form = document.querySelector('form');
  const valid = form.checkValidity();
  if (valid) {
    const data = globals.functions.exportData();
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          submitSuccesss();
        } else {
          submitFailure(response);
        }
      })
      .catch(() => {
        submitFailure(null, form);
      });
  }
  */
}

// eslint-disable-next-line import/prefer-default-export
export {
  populateImageChoice, populateSelectedModel, populateDealership, populateVehicleDetails,
  submitToRestEndpoint,
};
