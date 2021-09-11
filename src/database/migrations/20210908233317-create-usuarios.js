module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
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

       sobrenome: {
        type: Sequelize.STRING,
        allowNull: false,
        },

       email:{
         type: Sequelize.STRING,
         allowNull: false,
         unique: true,
       },

       telefone: {
        type: Sequelize.STRING,
        allowNull: true,
        },

        login:{
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },

        senha_hash: {
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
      });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('usuarios');
  }
};
