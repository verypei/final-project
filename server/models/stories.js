'use strict';
module.exports = (sequelize, DataTypes) => {
  const stories = sequelize.define('stories', {
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          message:"title can't be empty"
        }
      }
    },
    content: {
      type:DataTypes.TEXT,
      validate:{
        notEmpty:{
          message:"conten can't be empty"
        }
      }
    },
    theme: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          message:"theme can't be empty"
        }
      }
    },
    createdBy: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          message:"created by can't be empty"
        }
      }
    }
  }, {});
  stories.associate = function(models) {
    // associations can be defined here
  };
  return stories;
};