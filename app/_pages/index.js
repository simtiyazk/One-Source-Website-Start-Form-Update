export default {
  name: 'Home',
  page_url: '/',
  prefix: 'home',
  hero: {
    views: [
      {
        footer: {
          nav:[{
            name: 'Terms of Use',
            link: 'https://proventionbio.com/terms-of-use/',
            target: '_blank',
            dataCategory: 'data-category="Footer"',
            dataEvent: 'data-event="Footer - Click"',
            EventLabel: 'event-label="Terms of Use"',
          },
          {
            name: 'Contact Us',
            link: 'https://proventionbio.com/contact-us/',
            target: '_blank',
            dataCategory: 'data-category="Footer"',
            dataEvent: 'data-event="Footer - Click"',
            EventLabel: 'event-label="Contact Us"',
          },
          {
            name: 'Site Map',
            link: '/site-map/',
            dataCategory: 'data-category="Footer"',
            dataEvent: 'data-event="Footer - Click"',
            EventLabel: 'event-label="Site Map"',
          }, {
            name: 'Privacy Policy',
            link: 'https://proventionbio.com/privacy-policy',
            target: '_blank',
            dataCategory: 'data-category="Footer"',
            dataEvent: 'data-event="Footer - Click"',
            EventLabel: 'event-label="Privacy Policy"',

          },
          {
            link: 'https://www.instagram.com/type1tested',
            target: '_blank',
            icon:'/images/footer/instagram.png',
            dataCategory: 'data-category="Footer"',
            dataEvent: 'data-event="Footer - Click"',
            EventLabel: 'event-label="Privacy Policy"',
          },
          {
            link: 'https://www.facebook.com/type1tested',
            target: '_blank',
            icon:'/images/footer/facebook.png',
            dataCategory: 'data-category="Footer"',
            dataEvent: 'data-event="Footer - Click"',
            EventLabel: 'event-label="Privacy Policy"',
          }
        ],
        
          content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin lacinia malesuada. In cursus dolor sit amet elit fermentum consectetur. Etiam tempus, nisl nec bibendum elementum,',
          copyright:'&copy; 2021 Provention Bio, Inc. PM-UNB-007',
          date: '04/21',
          logo:'/images/footer/ProventionBio_logo.png',
          logoURL: 'https://proventionbio.com/',
          alt: 'Provention Bio logo'
        },
      }
    ]
  }
};
