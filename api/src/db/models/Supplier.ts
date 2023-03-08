module.exports = (sequelize: any, DataTypes: any) => {
  sequelize.define("Supplier", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cifNif: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poblacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  });
};
