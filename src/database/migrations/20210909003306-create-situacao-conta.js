module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('situacao_conta', {
       id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
       },

       nome: {
         type: Sequelize.STRING,
         allowNull: false,
       },

       descricao: {
        type: Sequelize.STRING,
        allowNull: false,
        },

       created_at: {
        type: Sequelize.DATE,
        allowNull: false,
       },

       updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
       },
      },
      {
        freezeTableName: true,
        tableName: "situacao_conta"
      });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('situacao_conta');
  }
};
