module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("ledger", {
        ledgerEntryID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        transactionID: {
            type: Sequelize.UUID,
            allowNull: false, 
        },
        stripeTransactionID: {
            type: Sequelize.UUID,
            allowNull: true, // TODO: can this ever be null??? should this be unique?
        },
        senderAccountID: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        recipientAccountID: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        amount: {
            type: Sequelize.DECIMAL(19,4),
            allowNull: false,
            validate: {
                min: 0 // no negatives
            }
        },
        currencyType: {
            type: Sequelize.UUID,
            allowNull: false,
            validate: {
                isIn: [["fiat", "change_pocket", "change_business"]]
            },
        },
        currencyID: {
            type: Sequelize.UUID,
            allowNull: true, // null -> currencyType == "fiat"
        },
        
        fee: {
            type: Sequelize.DECIMAL(19,4),
            allowNull: false,
            validate: {
                min: 0 // no negative fees
            }
        },

        total: {
            type: Sequelize.DECIMAL(19,4),
            allowNull: false,
            validate: {
                min: 0 // no negative totals
            }
        },

        timestamp: {
            type: Sequelize.DATE(6),
            allowNull: false
        },


    });
  
    return Transaction;
};