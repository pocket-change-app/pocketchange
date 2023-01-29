module.exports = (sequelize, Sequelize) => {
    const Ledger = sequelize.define("ledger", {
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
        entryType: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [[
                    "RECEIVE_STRIPE_CHARGE",
                    "CREDIT_FIAT",
                    "DEBIT_FIAT", 
                    "AWARD_CHANGE", 
                    "REDEEM_CHANGE", 
                    "COLLECT_FEE", 
                    "WITHDRAW_FEE", 
                    "PAYOUT_STRIPE",
                    "PAYOUT_BUSINESS",
                    "PAYOUT_POCKETCHANGE",
                ]]
                    
            },
        },
        amount: {
            type: Sequelize.DECIMAL(19,4),
            allowNull: false,
            validate: {
                min: 0 // no negatives
            }
        },
        currencyType: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [["FIAT", "CHANGE_POCKET"]]
            },
        },
        pocketID: {
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
  
    return Ledger;
};