import * as Yup from "yup";

export default Yup.object({
  age: Yup.number()
    .min(0, "Please enter valid age")
    .max(120, "Please enter valid age")
    .required("Please enter your age"),
  gender: Yup.string().required("Please choose your gender"),
  weight: Yup.number()
    .min(0, "Please enter valid weight")
    .max(150, "Please enter valid weight")
    .required("Please enter your weight"),
  height: Yup.number()
    .min(0, "Please enter valid height")
    .max(250, "Please enter valid height")
    .required("Please enter your height"),
  activityLevel: Yup.string().required("Please choose your activity level"),
  goal: Yup.string().required("Please choose your goal"),
  formula: Yup.string().required(
    "Please choose formula to calculate goal calories"
  ),
});
