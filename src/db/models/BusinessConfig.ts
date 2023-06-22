export const model = (sequelize: any, DataTypes: any) => {
    sequelize.define(
      "BusinessConfig",
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        }
      },
      { updatedAt: false, timestamps: false }
    );
  };
  