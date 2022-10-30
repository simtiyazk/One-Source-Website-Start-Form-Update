export const orderFormConstructor = (formInfo) => {

  let form = initForm();

  form['First name'] = formInfo.firstName;
  form['Last name'] = formInfo.lastName;
  form['Office address'] = formInfo.adress1;
  form['Office address 2'] = formInfo.adress2;
  form['Office city'] = formInfo.city;
  form['State'] = formInfo.state;
  form['Zip code'] = formInfo.zip;
  form['Institution'] = formInfo.institution;
  form['Email2'] = formInfo.email;
  form['Office telephone'] = formInfo.phone;
  form['NPI'] = formInfo.npiNumber;
  form['saliva kits'] = formInfo.salivaKitQty;
  form['Blood kits'] = formInfo.bloodKitQty;
  form['HCP Certification'] = 'X';
  form['Marketing Opt-In'] = '';

  if (formInfo.isAcceptedTerms === true) {
    form['Marketing Opt-In'] = 'X';
  }

  const newForm = $.param(form);

  return newForm;
};

const initForm = () => ({
  'First name': '',
  'Last name': '',
  'Office address': '',
  'Office address 2': '',
  'Office city': '',
  'State': '',
  'Zip code': '',
  'Institution': '',
  'Email2': '',
  'Office telephone': '',
  'NPI': '',
  'saliva kits': '',
  'Blood kits': '',
  'HCP Certification': '',
  'Marketing Opt-In': ''
});
