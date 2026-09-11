export const createAssets = ({ isProd, basePath = '/assets' } = {}) => {
  const suffix = isProd ? '.min' : '';

  return {
    css: (name) => `${basePath}/css/${name}${suffix}.css`,
    js: (name) => `${basePath}/js/${name}.js`,
    img: (name) => `${basePath}/images/${name}`,
    font: (name) => `${basePath}/fonts/${name}`,
  };
};
