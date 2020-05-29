'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('stories', [
        {
          title: 'navbar',
          content: `Navbar adalah komponen Bootstrap untuk membuat menu navigasi. Boleh dibilang bahwa
                    navbar adalah "versi upgrade" dari komponen nav yang baru saja kita bahas. Navbar memiliki
                    banyak sub-komponen, yakni fitur-`,
          theme:"navbar",
          createdBy:"very",
          createdAt:new Date(),
          updatedAt: new Date()
        },
        {
          title: 'button',
          content: `Button adalah komponen Bootstrap untuk membuat tombol. Dalam HTML, button bisa dibuat
                    dengan berbagai cara, misalnya menggunakan tag <button> dan tag <input type=button>.
                    Selain itu Bootstrap juga membolehkan kita membuat button dari tag lain seperti <span> atau
                    <a>. Caranya, tambahkan class .btn ke dalam element tersebut.`,
          theme:"button",
          createdBy:"chandra",
          createdAt:new Date(),
          updatedAt: new Date()
        }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stories', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
