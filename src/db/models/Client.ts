export default (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cifNif: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      poblacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
