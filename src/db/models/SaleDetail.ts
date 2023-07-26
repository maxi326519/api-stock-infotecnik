export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "SaleDetail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      precioUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
