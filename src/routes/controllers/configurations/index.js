const { Configuration } = require("../../../db/index");

const getConfiguration = async () => {
  const configuration = await Configuration.findOne({ where: { id: 1 } });

  console.log(configuration)

  return configuration;
};

const updateConfiguration = async (data) => {
  const configRef = await Configuration.findOne({
    where: { id: 1 },
  });

  await configRef.update(data);
  return configRef;
};

module.exports = {
  getConfiguration,
  updateConfiguration,
};
