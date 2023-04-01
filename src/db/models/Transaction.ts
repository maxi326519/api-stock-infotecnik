module.exports = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Transaction",
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
      fechaValor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movimiento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      masDatos: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      importe: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
