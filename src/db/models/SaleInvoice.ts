export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "SaleInvoice",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tipoImpositivo: {
        type: DataTypes.ENUM("IVA", "Recargo", "REBU", "Compuesto"),
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ticket: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
