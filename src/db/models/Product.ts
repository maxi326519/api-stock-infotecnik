export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descLarga: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      descCorta: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    { updatedAt: false, createAt: false }
  );
};
