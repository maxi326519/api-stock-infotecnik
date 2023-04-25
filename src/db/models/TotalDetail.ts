export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "TotalDetail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      concepto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.FLOAT,
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
    },
    { updatedAt: false, timestamps: false }
  );
};
