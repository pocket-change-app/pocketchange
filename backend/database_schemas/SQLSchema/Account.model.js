

module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        accountID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        ownerID: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        balance: {
            type: Sequelize.DECIMAL(19,4),
            allowNull: false
        },
        currencyType: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [[
                        "FIAT", 
                        "CHANGE_POCKET", 
                    ]]
            },

        },
        pocketID: {
            type: Sequelize.UUID,
            allowNull: true, // null -> currencyType == "fiat"
        },
        lastUpdated: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
  
    return Account;
};