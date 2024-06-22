const customComponent = {
  datetime: './components/datetime.js',
  location: './components/location.js',
  'card-selection': './components/card.js',
};

/**
 * returns a decorator to decorate the field definition
 *
 * */
export default async function componentDecorator(fd) {
  const { ':type': type = '', fieldType } = fd;
  if (fieldType === 'file-input') {
    const module = await import('./components/file.js');
    return module.default;
  }
  if (type.endsWith('wizard')) {
    const module = await import('./components/wizard.js');
    return module.default;
  }
  if (type.endsWith('imagechoice')) {
    const module = await import('./components/imagechoice.js');
    return module.default;
  }
  if (customComponent[type]) {
    const module = await import(customComponent[type]);
    return module.default;
  }
  return null;
}
