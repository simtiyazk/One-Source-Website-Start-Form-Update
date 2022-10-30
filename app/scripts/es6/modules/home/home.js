import $ from 'jquery';
import { prefix} from '../../helpers/constants';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default () => {
  if ($(`.${prefix}-m-hero-container`).length > 0) {

    // smooth scroll anchor
    

    ScrollTrigger.matchMedia({
  
      // all
      'all': function() {
        // ScrollTriggers created here aren't associated with a particular media query,
        // so they persist.

        // animate text in
        gsap.utils.toArray('.submit-btn').on('click',function(elem) {
          gsap.set(elem, {y: '+=100', opacity:0});

          ScrollTrigger.batch(elem, {
            scroller: '.tep-m-sign-up-form',
            onEnter: batch => gsap.to(batch, {duration:1, opacity: 1, y:0, stagger: 0.5, ease: 'back.out(1.1)', overwrite: true}),
          });

          ScrollTrigger.addEventListener('refreshInit', () => gsap.set(elem, {y: 0}));
        });
      }
    });
  }
};
