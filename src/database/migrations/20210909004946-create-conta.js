module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conta', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
       },

       id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {model : 'usuarios', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
       },

      id_situacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {model : 'situacao_conta', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
       },

       num_conta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        },

      corretora: {
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
        tableName: "conta"
      })

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('conta');
  }
};
