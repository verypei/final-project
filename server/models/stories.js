'use strict';
module.exports = (sequelize, DataTypes) => {
  const stories = sequelize.define('stories', {
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg:"title can't be empty"
        },
        notNull:{
          msg:"title can't be empty"
        }
      }
    },
    content: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty:{
          msg:"content can't be empty"
        },
        notNull:{
          msg:"content can't be empty"
        }
      }
    },
    theme: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg:"theme can't be empty"
        },
        notNull:{
          msg:"theme can't be empty"
        }
      }
    },
    createdBy: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg:"created by can't be empty"
        },
        notNull:{
          msg:"created by can't be empty"
        }
      }
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:"language can't be empty"
        },
        notNull:{
          msg:"language can't be empty"
        }
      }
    }
  }, {});
  stories.associate = function(models) {
    // associations can be defined here
  };
  return stories;
};