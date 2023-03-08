module.exports = (sequelize: any, DataTypes: any) => {
  sequelize.define("Stock", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("Nuevo", "Casi nuevo", "Vendido"),
      allowNull: true,
      unique: true,
    },
    IMEISerie: {
      type: DataTypes.INTEGER,
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
      allowNull: false,
    },
    codigoDeBarras: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    }
  });
};
