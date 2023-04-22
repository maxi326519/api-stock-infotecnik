module.exports = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Configuration",
    {
      ivaSuperReducido: {
        type: DataTypes.FLOAT,
        defaultValue: 4,
        allowNull: false,
      },
      ivaReducido: {
        type: DataTypes.FLOAT,
        defaultValue: 10,
        allowNull: false,
      },
      ivaGeneral: {
        type: DataTypes.FLOAT,
        defaultValue: 21,
        allowNull: false,
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
