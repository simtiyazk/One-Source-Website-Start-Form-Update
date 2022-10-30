import { formSelect } from './constants';

export const formConstructor = (formInfo) => {

  let form = initForm();

  form['First Name'] = formInfo.firstName;
  form['Last Name'] = formInfo.lastName;
  form['E-mail Address'] = formInfo.email;
  form['Zip code'] = formInfo.zip;
  form['Self Description'] = formInfo.describe;

  switch(formInfo.describe) {
    case formSelect.careIRD:
    case formSelect.careVI:
    case formSelect.knowIRD:
      form['Patient Age Group'] = formInfo.describeValue.value;
      break;
    case formSelect.HCP:
      form['HCP Specialty'] = formInfo.describeValue.value;
      (formInfo.describeValue.value === formSelect.other) && (form['HCP Specialty Other'] = formInfo.describeValue.otherSpecialityValue);
      break;
    case formSelect.other:
      form['Self Description Other'] = formInfo.describeValue.value;
      break;
    default:
      break;
  }

  const newForm = $.param(form);

  return newForm;
};

const initForm = () => ({
  'Disease Interest - IRDs': 'X',
  'Self Description': '',
  'Patient Age Group': '',
  'HCP Specialty': '',
  'HCP Specialty Other': '',
  'Self Description Other': '',
  'First Name': '',
  'Last Name': '',
  'E-mail Address': '',
  'Zip code': '',
  'Age Verification': 'X',
  'Opt in': 'X'
});
