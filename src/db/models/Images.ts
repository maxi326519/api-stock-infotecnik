module.exports = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Images",
    {
      imagUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
