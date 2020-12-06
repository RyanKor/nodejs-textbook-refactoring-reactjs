//readme.md에 입력된 SQL 명령어와 동일하게 models를 입력한다.
//Django models.py를 작성할 때를 생각해보면, 그 때와 사실상 동일하다
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING(20), //VARCHAR -> STRING
        allowNull: false,
        unique: true,
      },
      age: {
        type: DataTypes.INTEGER.UNSIGNED, // INT-> INTEGER
        allowNull: false,
      },
      married: {
        type: DataTypes.BOOLEAN, //TINYINT -> BOOLEAN
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE, //DATETIME -> DATE
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};
