module.exports = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Invoice",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      pendiente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      archivo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      tipoImpositivo: {
        type: DataTypes.ENUM("IVA", "Recargo", "REBU"),
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
