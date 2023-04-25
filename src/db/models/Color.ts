export default (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Color",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
