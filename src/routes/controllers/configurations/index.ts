import { Configuration, BusinessConfig } from "../../../db/index";

export const getConfiguration = async () => {
  const configuration = await Configuration.findOne({ where: { id: 1 } });
  const businessConfig = await BusinessConfig.findOne({ where: { id: 1 } });
  return {
    configuration,
    businessConfig
  };
};

export const updateConfiguration = async (data: any) => {
  const configRef = await Configuration.findOne({
    where: { id: 1 },
  });

  if (configRef) await configRef.update(data);
  else throw new Error("config not found");

  return configRef;
};
