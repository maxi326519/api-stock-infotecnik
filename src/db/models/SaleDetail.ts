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
      concepto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipoImpositivo: {
        type: DataTypes.ENUM("IVA", "Recargo", "REBU"),
        allowNull: false,
      },
      baseImponible: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      ivaPorcentaje: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      ivaMonto: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      recargoPorcentaje: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      recargoMonto: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
