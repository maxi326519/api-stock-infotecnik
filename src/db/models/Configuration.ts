module.exports = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Configuration",
    {
      iva: {
        type: DataTypes.FLOAT,
        defaultValue: 21,
        allowNull: false,
        unique: true,
      },
      recargo: {
        type: DataTypes.FLOAT,
        defaultValue: 5.2,
        allowNull: true,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};
