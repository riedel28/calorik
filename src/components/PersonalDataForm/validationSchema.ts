import * as Yup from 'yup';

export default Yup.object().shape({
  gender: Yup.string().required('Please choose your gender'),
  age: Yup.number()
    .min(0, 'yourData.age.error')
    .max(120, 'yourData.age.error')
    .required('yourData.age.placeholder'),
  weight: Yup.number()
    .min(0, 'yourData.weight.error')
    .max(300, 'yourData.weight.error')
    .required('yourData.weight.placeholder'),
  height: Yup.number()
    .min(0, 'yourData.height.error')
    .max(250, 'yourData.height.error')
    .required('yourData.height.placeholder'),
  activityLevel: Yup.string().required('activityLevel.placeholder'),
  goal: Yup.string().required('goal.placeholder'),
  formula: Yup.string().required('formula.placeholder'),
});
