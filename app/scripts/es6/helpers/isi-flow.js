import $ from 'jquery';
const references = $('.reference');
const homeReference = $('.home-reference');
const aboutReference = $('.about-references');

export const referencesHome = () => {
  references.hide();
  homeReference.show();
};

export const referencesAbout = () => {
  references.hide();
  aboutReference.show();
};

export const referencesStayUpToDate = () => references.hide();
