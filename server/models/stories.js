'use strict';
module.exports = (sequelize, DataTypes) => {
  const stories = sequelize.define('stories', {
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          message:"can't empty"
        }
      }
    },
    content: {
      type:DataTypes.TEXT,
      validate:{
        notEmpty:{
          message:"can't empty"
        }
      }
    },
    theme: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          message:"can't empty"
        }
      }
    },
    createdBy: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          message:"can't empty"
        }
      }
    }
  }, {});
  stories.associate = function(models) {
    // associations can be defined here
  };
  return stories;
};