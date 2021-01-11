import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Personal data": "Personal data",
      Age: "Age",
      Gender: "Gender",
      Male: "Male",
      Female: "Female",
      Weight: "Weight",
      Height: "Height",
      "Activity Level": "Activity level",
      "Little / No exercise": "Little / No exercise",
      "Light exercise (1-3 days per week)":
        "Light exercise (1-3 days per week)",
      "Moderate exercise (3-5 days per week)":
        "Moderate exercise (3-5 days per week)",
      "Heavy exercise (6-7 days per week)":
        "Heavy exercise (6-7 days per week)",
      "Very heavy exercise (twice per day, extra heavy workouts)":
        "Very heavy exercise (twice per day, extra heavy workouts)",
      "Your goal": "Your goal",
      "Cut (-20%)": "Cut (-20%)",
      Maintain: "Maintain",
      "Gain (+15%)": "Gain (+15%)",
      Formula: "Formula",
      "The Original Harris-Benedict Equation":
        "The Original Harris-Benedict Equation",
      "The Mifflin St. Jeor Equation": "The Mifflin St. Jeor Equation",
    },
  },
  ru: {
    translation: {
      "Personal data": "Личные данные",
      Age: "Возраст",
      Gender: "Пол",
      Male: "Мужской",
      Female: "Женский",
      Weight: "Вес",
      Height: "Рост",
    },
  },
  de: {
    translation: {
      "Personal data": "Persönliche Daten",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
