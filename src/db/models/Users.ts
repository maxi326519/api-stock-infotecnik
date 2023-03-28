module.exports = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      rol: {
        type: DataTypes.ENUM("admin", "empleado", "contador"),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
