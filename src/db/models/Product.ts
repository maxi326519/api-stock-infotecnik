export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,        
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
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
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descLarga: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      descCorta: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    { updatedAt: false }
  );
};
