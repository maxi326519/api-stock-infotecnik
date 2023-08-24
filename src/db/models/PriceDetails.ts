import { ENUM } from "sequelize";

export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "PriceDetails",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      metododepago: {
        type: DataTypes.ENUM(
          "EFECTIVO",
          "TARJETA",
          "TRANSFERENCIA BANCARIA",
          "BIZUM",
          "CONTRATO COMPRAVENTA"
        ),
        allowNull: false,
      },
      monto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nroOperacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
