import * as Yup from 'yup';

export default Yup.object({
  gender: Yup.string().required('Please choose your gender'),
  age: Yup.number()
    .typeError('Age must be a number')
    .min(0, 'Please enter valid age')
    .max(120, 'Please enter valid age')
    .required('Please enter your age'),
  weight: Yup.number()
    .typeError('Weight must be a number')
    .min(0, 'Please enter valid weight')
    .max(150, 'Please enter valid weight')
    .required('Please enter your weight'),
  height: Yup.number()
    .typeError('Height must be a number')
    .min(0, 'Please enter valid height')
    .max(300, 'Please enter valid height')
    .required('Please enter your height'),
  activityLevel: Yup.string().required('Please choose your activity level'),
  goal: Yup.string().required('Please choose your goal'),
  formula: Yup.string().required(
    'Please choose formula to calculate goal calories'
  ),
});
