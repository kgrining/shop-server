'use strict';

const Item = require('../api/items/items.model');

module.exports = () => {
  return Item.find({}).remove({}).then(() => {
    return Item.create(
      {
        name: 'TestName1',
        desc: 'Lorm dolo amet, consectetur adipiscing elit, sed do eiusmod temdidunt ut labore et dolore magna aliqua. Ut enim anisi ut aliquip ex ea commoelit esse cillum dolore eu fugiatt occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imgPath: '../../../../assets/background/image-pic/f1.png',
        price: 1
      },
      {
        name: 'TestName2',
        desc: 'Lsum dolor sit amet, consectetu elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptre eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imgPath: '../../../../assets/background/image-pic/f2.png',
        price: 2.1
      },
      {
        name: 'TestName3',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostruodo consequat. Duis aute irure dolor innderit in voluptate velit esse cillum dolore eu fugiat nulla idatat non proident, sunnt mollit anim id est laborum.',
        imgPath: '../../../../assets/background/image-pic/f3.png',
        price: 3.13
      },
      {
        name: 'TestName4',
        desc: 'Lorem ir sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imgPath: '../../../../assets/background/image-pic/f4.png',
        price: 1.1
      },
      {
        name: 'TestName5',
        desc: 'Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna altion ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat anim id est laborum.',
        imgPath: '../../../../assets/background/image-pic/f5.png',
        price: 2.9
      },
      {
        name: 'TestName6',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdent, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imgPath: '../../../../assets/background/image-pic/f6.png',
        price: 3
      },
      {
        name: 'TestName7',
        desc: 'Lorem  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imgPath: '../../../../assets/background/image-pic/f7.png',
        price: 1
      },
      {
        name: 'TestName8',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdent, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imgPath: '../../../../assets/background/image-pic/f8.png',
        price: 3
      },
      {
        name: 'TestName9',
        desc: 'Lorem  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imgPath: '../../../../assets/background/image-pic/f9.png',
        price: 1
      },
      {
        name: 'TestName10',
        desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Eollit anim id est laborum.',
        imgPath: '../../../../assets/background/image-pic/f10.png',
        price: 2
      },
        {
            name: 'TestName11',
            desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Eollit anim id est laborum.',
            imgPath: '../../../../assets/background/image-pic/f11.png',
            price: 2
        });
  });
};
