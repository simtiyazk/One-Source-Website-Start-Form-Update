import { prefix } from '../scripts/es6/helpers/';

import home from '../_pages/';
module.exports = {
  global: {
    prefix: 'tep',
    ga: {
      enabled: false,
      id: 'UA-XXXXX-Y'
    },
    gtm: {
      enabled: true,
      id: 'GTM-MF78JL8'
    },
    logo: {
      url: 'images/home/onelogo.png',
      alt: 'One Source logo'
    },
    footer: {
      nav:[{
        name: 'Privacy Notice',
        link: 'https://alexion.com/Legal#privacynotice',
        target: '_blank'
      },
      {
        name: 'Terms And Conditions',
        link: 'https://alexion.com/Legal#termsofuse',
        target: '_blank'
      },
      {
        name: 'Opt Out',
        link: 'https://alexiononesource.com/opt-out-form',
        target: '_blank'
      }, 
    ]
    },
    footerlogo:{
      img: 'images/home/logoalexion.png',
      alttext: 'alexion logo'
    },
  },
  pages: {
    home,
  }
};
