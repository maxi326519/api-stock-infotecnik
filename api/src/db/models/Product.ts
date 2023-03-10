module.exports = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
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
      descCorta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descLarga: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { updatedAt: false, createAt: false }
  );
};
