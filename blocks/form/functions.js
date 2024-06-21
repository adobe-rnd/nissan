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
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

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
}

/**
 * Populates the dealership field with the given options
 * @param {*} chooseModel
 * @param {*} location
 * @param {object} dealershipField
 * @param {scope} globals
 */
function populateDealership(chooseModel, location, dealershipField, globals) {

}

// eslint-disable-next-line import/prefer-default-export
export {
  getFullName, days, populateImageChoice, populateSelectedModel, populateDealership,
};
