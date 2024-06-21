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
  const response = [
    {
      id: "JUKEF16B",
      name: 'Nissan Juke',
      source: 'https://www-europe.nissan-cdn.net/content/dam/Nissan/gb/vehicles/juke/my23/Juke_Packshot_Yellow.png.ximg.l_6_m.smart.png',
    },
    {
      id: "QASHQAIJ12B",
      name: 'New Nissan Qashqai',
      source: 'https://www-europe.nissan-cdn.net/content/dam/Nissan/nissan_europe/UNVEIL_QQ-PUSH/new-unveil-qashqai.png.ximg.l_6_m.smart.png',
    },
    {
      id: "XTRAILT33B",
      name: 'Nissan X-Trail',
      source: 'https://www-europe.nissan-cdn.net/content/dam/Nissan/gb/vehicles/packshots/x-trail-my24/MAIN_MENU_MY24_ALLOYS.jpg.ximg.l_6_m.smart.jpg',
    },
  ];
  globals.functions.setProperty(imageChoiceField, {enum: response});
}

/**
 * Populates the image choice component with the given options
 * @param {*} modelChoiceField
 * @param {object} selectedModelPanel
 * @param {scope} globals
 */
function populateSelectedModel(modelChoiceField, selectedModelPanel, globals) {
  // get model details based on the selected model (modelChoiceField)
  const modelDetailsInfoMap = {
    "JUKEF16B": {
      id: "JUKEF16B",
      name: 'Nissan Juke',
      source: 'https://www-europe.nissan-cdn.net/content/dam/Nissan/gb/vehicles/juke/my23/Juke_Packshot_Yellow.png.ximg.l_6_m.smart.png',
    },
    "QASHQAIJ12B": {
      id: "QASHQAIJ12B",
      name: 'New Nissan Qashqai',
      source: 'https://www-europe.nissan-cdn.net/content/dam/Nissan/nissan_europe/UNVEIL_QQ-PUSH/new-unveil-qashqai.png.ximg.l_6_m.smart.png',
    },
    "XTRAILT33B" :{
      id: "XTRAILT33B",
      name: 'Nissan X-Trail',
      source: 'https://www-europe.nissan-cdn.net/content/dam/Nissan/gb/vehicles/packshots/x-trail-my24/MAIN_MENU_MY24_ALLOYS.jpg.ximg.l_6_m.smart.jpg',
    }
  }
  const selectedModel = modelDetailsInfoMap[modelChoiceField];

  globals.functions.setProperty(selectedModelPanel.selectedModelImage, {value: selectedModel.source});
  globals.functions.setProperty(selectedModelPanel.selectedModelName, {value: selectedModel.name});
}

// eslint-disable-next-line import/prefer-default-export
export { getFullName, days, populateImageChoice, populateSelectedModel };
