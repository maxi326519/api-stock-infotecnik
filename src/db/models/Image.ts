export default (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Image",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
