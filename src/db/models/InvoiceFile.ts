export const model = (sequelize: any, DataTypes: any) => {
    sequelize.define(
      "InvoiceFile",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM("Compra", "Venta", "Servicios"),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      { updatedAt: false, timestamps: false }
    );
  };