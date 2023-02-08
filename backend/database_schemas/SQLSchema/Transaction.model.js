module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        transactionID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        stripeTransactionID: {
            type: Sequelize.UUID,
            allowNull: false, // TODO: can this ever be null? should this be unique?
        },
        senderID: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        recipientID: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        pocketID: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        initiatorID: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        initiationType: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [["CUSTOMER_INITIATED", "MERCHANT_INITIATED"]]
            },
        },
        transactionType: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [[
                        "PURCHASE", 
                        "REFUND", 
                        "LOAD_CUSTOMER_WALLET", 
                        "LOAD_POCKET_WALLET"
                    ]]
            },
        },
        refundReference: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        subtotal: {
            type: Sequelize.DECIMAL(19,4),
            allowNull: false,
            validate: {
                min: 0 // no negative subtotals
            }
        },
        tip: {
            type: Sequelize.DECIMAL(19,4),
            allowNull: false,
            validate: {
                min: 0 // no negative tips
            }
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