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

const response = {
  success: true,
  source: 'EXTERNAL',
  modelCode: 'JUKEF16B',
  dealers: [
    {
      dealerId: '051910',
      name: 'Glyn Hopkin North London (London)',
      address: {
        addressLine1: '49-51 Stamford Hill',
        addressLine2: '',
        postalCode: 'N16 5TB',
        city: 'London',
        state: null,
      },
      contact: {
        phone: '020 3058 3840',
      },
      distance: {
        km: 3.230844048915564,
        miles: 2.007552797518713,
      },
      vehicles: [
        {
          modelCode: 'JUKEF16B',
          vin: 'SJNFCAF16U2001961',
          modelName: 'JUKE',
          gradeName: 'Tekna',
          modelGroupCode: 'F16B',
          powerTrain: 'Hybrid',
          transmission: 'Automatic',
          driveTrain: '2WD',
        },
      ],
      testdriveTypes: [
        'dealer',
      ],
    },
    {
      dealerId: '051565',
      name: 'Glyn Hopkin East London (London)',
      address: {
        addressLine1: '1021 Romford Road, Manor Park',
        addressLine2: '',
        postalCode: 'E12 5LH',
        city: 'London',
        state: null,
      },
      contact: {
        phone: '020 8131 2733',
      },
      distance: {
        km: 6.310120684627629,
        miles: 3.9209259999277544,
      },
      vehicles: [
        {
          modelCode: 'JUKEF16B',
          vin: 'SJNFCAF16U2000109',
          modelName: 'JUKE',
          gradeName: 'Tekna',
          modelGroupCode: 'F16B',
          powerTrain: 'Hybrid',
          transmission: 'Automatic',
          driveTrain: '2WD',
        },
      ],
      testdriveTypes: [
        'dealer',
      ],
    },
    {
      dealerId: '051856',
      name: 'Ancaster Eltham',
      address: {
        addressLine1: '43-45 High Street',
        addressLine2: '',
        postalCode: 'SE9 1DH',
        city: 'Eltham',
        state: null,
      },
      contact: {
        phone: '020 8331 6900',
      },
      distance: {
        km: 7.083106429279261,
        miles: 4.401236925067684,
      },
      vehicles: [
        {
          modelCode: 'JUKEF16B',
          vin: 'SJNFCAF16U2001366',
          modelName: 'JUKE',
          gradeName: 'Tekna',
          modelGroupCode: 'F16B',
          powerTrain: 'Hybrid',
          transmission: 'Automatic',
          driveTrain: '2WD',
        },
      ],
      testdriveTypes: [
        'dealer',
      ],
    },
  ],
  alternatePowerTrain: false,
};

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
function populateDealership(model, location, powerTrain, list, dealerPanel, title, globals) {
  if (model && location && powerTrain) {
    fetch(`https://publish-p51113-e1377975.adobeaemcloud.com/content/nissan-forms-poc/dealerships.html?modelCode=${model}&powerTrain=${powerTrain}`)
      .then((resp) => async () => {
        if (resp.ok) {
          const result = await resp.json();
          const dealers = result.dealers || [];
          globals.functions.setProperty(
            list,
            { value: dealers },
          );
          globals.functions.setProperty(
            dealerPanel,
            { label: `Showing ${dealers.length} dealerships` },
          );
        }
      });
    const name = carModelsMap[model] ? carModelsMap[model].name : '';
    globals.functions.setProperty(
      title,
      { value: `with a ${name} ${powerTrain} available` },
    );
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
  if (dealer && dealer.vehicles) {
    vehicles = dealer.vehicles;
  }
  globals.functions.setProperty(
    vehicle,
    { value: vehicles },
  );
  if (vehicle.length > 0) {
    globals.functions.setProperty(
      vehicle,
      { value: vehicles[0] },
    );
  }
}

// eslint-disable-next-line import/prefer-default-export
export {
  populateImageChoice, populateSelectedModel, populateDealership, populateVehicleDetails,
};
