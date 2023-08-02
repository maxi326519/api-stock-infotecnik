export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Transaction",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fechaValor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movimiento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      masDatos: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      importe: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      saldo: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      vinculada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
