export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
