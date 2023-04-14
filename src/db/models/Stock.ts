module.exports = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Stock",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      estado: {
        type: DataTypes.ENUM("Nuevo", "Casi nuevo", "Vendido", "Temporal"),
        allowNull: false,
      },
      fechaAlta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      catalogo: {
        type: DataTypes.BOOLEAN,
        allowNUll: false,
      },
      IMEISerie: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      tipoCodigoDeBarras: {
        type: DataTypes.ENUM(
          "Code128",
          "Code39",
          "UPC-A",
          "UPC-E",
          "EAN8",
          "EAN-13"
        ),
        allowNull: true,
      },
      codigoDeBarras: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      precioIVA: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      precioSinIVA: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      precioIVAINC: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      recargo: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      detalles: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
