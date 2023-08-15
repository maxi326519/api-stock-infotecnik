export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "SaleInvoice",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      numero: {
        type: DataTypes.STRING,
        unique: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tipoImpositivo: {
        type: DataTypes.ENUM("Compuesto", "IVA", "Recargo", "REBU"),
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      generada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.INTEGER, // 1 Particular - 2 Empresa
        allowNull: true,
      },
      pdfUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
