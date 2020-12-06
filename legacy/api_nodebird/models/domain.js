module.exports = (sequelize, DataTypes) =>
  // models 오타 주의하기
  sequelize.define(
    "domain",
    {
      host: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      clientSecret: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
    },
    {
      validate: {
        unknownType() {
          //데이터 검증기 추가
          console.log(this.type, this.type !== "free", this.type !== "premium");
          if (this.type !== "free" && this.type !== "premium") {
            throw new Error("type 칼럼은 free or premium이어야합니다.");
          }
        },
      },
      timestamps: true,
      paranoid: true,
    }
  );
