export default (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Capacity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      capacidad: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
