'use strict';

const Item = require('../api/items/items.model');

module.exports = () => {
  return Item.find({}).remove({}).then(() => {
    return Item.create(
        {name: 'TestName1', desc: 'ShortTShortTShortTShortTShortTShortTShortTShortTShortTShortTShortTShortTShortTShortTShortTLONGLONGLONGLONGLONGLONG', imgPath: 'https://www.maxprog.com/img/cat.jpg', price: 1},
        {name: 'TestName2', desc: 'ShortTest2', imgPath: 'https://www.maxprog.com/img/cat.jpg', price: 2.1},
        {name: 'TestName3', desc: 'ShortTest3',  imgPath: 'https://www.maxprog.com/img/cat.jpg', price: 3.13},
        {name: 'TestName4', desc: 'ShortTest4',  imgPath: 'https://www.maxprog.com/img/cat.jpg', price: 1.1},
        {name: 'TestName5', desc: 'ShortTest5', imgPath: 'https://www.maxprog.com/img/cat.jpg', price: 2.9},
        {name: 'TestName6', desc: 'ShortTest6', imgPath: 'https://www.maxprog.com/img/cat.jpg', price: 3},
        {name: 'TestName7', desc: 'ShortTest7',  imgPath: 'https://www.maxprog.com/img/cat.jpg', price: 1},
        {name: 'TestName8', desc: 'ShortTest8',  imgPath: 'https://www.maxprog.com/img/cat.jpg', price: 2});
  });
};
