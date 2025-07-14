const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const complaints = sequelize.define(
    'complaints',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

title: {
        type: DataTypes.TEXT,

      },

description: {
        type: DataTypes.TEXT,

      },

category: {
        type: DataTypes.ENUM,

        values: [

"sanitation",

"infrastructure",

"safety"

        ],

      },

latitude: {
        type: DataTypes.DECIMAL,

      },

longitude: {
        type: DataTypes.DECIMAL,

      },

severity: {
        type: DataTypes.ENUM,

        values: [

"Low",

"Medium",

"High",

"Critical"

        ],

      },

status: {
        type: DataTypes.ENUM,

        values: [

"Pending",

"InProgress",

"Resolved"

        ],

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  complaints.associate = (db) => {

    db.complaints.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.complaints.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return complaints;
};

