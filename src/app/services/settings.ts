import { style, animate, keyframes } from '@angular/core';
export default {
  //ikke testet
  'localhost_paperstack': {
    starturl: 'home',
    menu: {
      template: 'menu0',
    },
    menuItem: {
      template: 'menu0.item',
    },
    page: {
      template: 'page0',
      animation: {
        pageSwitch: false,
        animations: [
          animate("0s", keyframes([
           style({transform: 'scale(1)'}),
           style({transform: 'scale(1)'}),
         ])),
        ],
      },
    },
    pageid: '1198',
    scripts: [
      '/src/app/js/paperstack/modernizr-custom.js',
      '/src/app/js/paperstack/classie.js',
      '/src/app/js/paperstack/main.js',
    ],
    styles: [
      '/src/app/css/paperstack/paperstackcss.css',
      '/src/styles.css',
    ],
  },
  // ikke testet
  'localhost_djdjd': {
    starturl: 'home',
    menu: {
      template: 'mmenu',
    },
    menuItem: {
      template: 'menu0.item',
    },
    page: {

      template: 'page',
      animation: {
        pageSwitch: true,
        animations: [
          animate("2s", keyframes([
            //style({transform: 'translateX(-100%) scale(1)'}),
            //style({transform: 'translateX(100%) scale(1)'}),
           style({transform: 'scale(0)'}),
           style({transform: 'scale(1)'}),
         ])),
          /* remove css animation on index*/
          /*animate("2s", keyframes([
            style({opacity: '1'}),
            style({opacity: '1'}),
          ]))*/
        ],
      },
    },
    pageid: '1183',
    scripts: [
      '/src/app/js/mmenu/mmenujs.js',
      '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js'
    ],
    styles: [
      '/src/app/css/mmenu/mmenucss.css',
      '/src/app/css/htmlbuilder.css',
      '/src/app/css/customstylingtest.css'
  ],
  },
  'localhost_frame': {
    starturl: 'menu',
    menu: {
      template: 'menu-material',
      is_menutab_opened: true,
    },
    menuItem: {
      template: 'menu-material.item',
    },
    page: {
      template: 'page-material',
      animation: {
        pageSwitch: true,
        animations: [
          animate("1.5s", keyframes([
            style({opacity: '0'}),
            style({opacity: '0'}),
            style({opacity: '0.1'}),
            style({opacity: '0.3'}),
            style({opacity: '0.6'}),
            style({opacity: '0.8'}),
            style({opacity: '1'})
         ]))
        ],
      },
    },
    footer: {
      template: 'footer-material',
    },
    pageid: '1183',
    scripts: ['/src/app/js/material/index.js', 'https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js'],
    styles: ['/src/app/css/material/index.css'],
  },
  'bast.dynamikfabrikken.com': {
    menu: {
      template: 'menu-material',
      is_menutab_opened: true,
    },
    menuItem: {
      template: 'menu-material.item',
    },
    page: {
      template: 'page-material',
      animation: {
        pageSwitch: true,
        animations: [
          animate("1.5s", keyframes([
            style({opacity: '0'}),
            style({opacity: '0'}),
            style({opacity: '0.1'}),
            style({opacity: '0.3'}),
            style({opacity: '0.6'}),
            style({opacity: '0.8'}),
            style({opacity: '1'})
         ]))
        ],
      },
    },
    footer: {
      template: 'footer-material',
    },
    pageid: '1183',
    scripts: ['/src/app/js/material/index.js'],
    styles: ['/src/app/css/material/index.css'],
  },
  'localhost': {
    starturl: 'home',
    menu: {
      template: 'dynamik',
      is_menutab_opened: true,
    },
    menuItem: {
      template: '',
    },
    page: {
      template: 'dynamik',
      animation: {
        pageSwitch: true,
        animations: [
          animate("1.5s", keyframes([
            style({opacity: '0'}),
            style({opacity: '0'}),
            style({opacity: '0.1'}),
            style({opacity: '0.3'}),
            style({opacity: '0.6'}),
            style({opacity: '0.8'}),
            style({opacity: '1'})
         ]))
        ],
      },
    },
    footer: {
      template: '',
    },
    pageid: '1183',
    scripts: ['/src/app/js/dynamik/jquery.shuffleLetters.js'
    , '/src/app/js/dynamik/index.js'
    , 'https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js'],
    styles: ['/src/app/css/dynamik/index.css'],
  },
  'dynamikfabrikken.com': {
    starturl: 'home',
    menu: {
      template: 'dynamik',
      is_menutab_opened: true,
    },
    menuItem: {
      template: '',
    },
    page: {
      template: 'dynamik',
      animation: {
        pageSwitch: true,
        animations: [
          animate("1.5s", keyframes([
            style({opacity: '0'}),
            style({opacity: '0'}),
            style({opacity: '0.1'}),
            style({opacity: '0.3'}),
            style({opacity: '0.6'}),
            style({opacity: '0.8'}),
            style({opacity: '1'})
         ]))
        ],
      },
    },
    footer: {
      template: '',
    },
    pageid: '1183',
    scripts: ['/src/app/js/dynamik/jquery.shuffleLetters.js'
    , '/src/app/js/dynamik/index.js'
    , 'https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js'],
    styles: ['/src/app/css/dynamik/index.css'],
  },
  'localhost_milma': {
    starturl: 'home',
    menu: {
      template: 'plain',
      is_menutab_opened: true,
    },
    menuItem: {
      template: 'plain',
    },
    page: {
      template: 'plain',
      animation: {
        pageSwitch: true,
        animations: [
          animate("0s", keyframes([
            style({opacity: '0'}),
            style({opacity: '1'})
         ]))
        ],
      },
    },
    footer: {
      template: 'plain',
    },
    pageid: '1274',
    scripts: ['/src/app/js/plain/index.js',
            '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js'],
    styles: ['/src/app/css/plain/index.css'],
  },
  // https://color.adobe.com/Plant-in-pots-color-theme-9869753/edit/?copy=true&base=2&rule=Custom&selected=3&name=Copy%20of%20Plant%20in%20pots&mode=rgb&rgbvalues=0.9333333333333333,0.48627450980392156,0.5098039215686274,0.9921568627450981,0.6431372549019608,0.4117647058823529,0.054901960784313725,0.1568627450980392,0.24705882352941178,0.27450980392156865,0.38823529411764707,0.45098039215686275,0.9568627450980393,0.9568627450980393,0.9490196078431372&swatchOrder=0,1,2,3,4
  'localhost_produktet': {
    starturl: 'home',
    menu: {
      template: 'plain',
      is_menutab_opened: true,
    },
    menuItem: {
      template: 'plain',
    },
    page: {
      template: 'plain',
      animation: {
        pageSwitch: true,
        animations: [
          animate("0s", keyframes([
            style({opacity: '0'}),
            style({opacity: '1'})
         ]))
        ],
      },
    },
    footer: {
      template: 'plain',
    },
    pageid: '1274',
    scripts: ['/src/app/js/plain/index.js',
            '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js'],
    styles: ['/src/app/css/plain/index.css'],
  },
  'other': {
    menu: {
      template: 'menu0',
    },
    page: {
      template: 'page0',
    },
    pageid: '1803',
  }
};
