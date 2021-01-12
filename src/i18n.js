import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Personal data": "Your data",
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
      "Moderate exercise (3–5 days per week)":
        "Moderate exercise (3-5 days per week)",
      "Heavy exercise (6–7 days per week)":
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
      Calculate: "Calculate",
      "You will need": "You will need",
      "kcal to": "kcal to",
      cut: "cut",
      maintain: "maintain",
      gain: "gain",
    },
  },
  ru: {
    translation: {
      "Personal data": "Ваши данные",
      Age: "Возраст",
      Gender: "Пол",
      Male: "Мужской",
      Female: "Женский",
      Weight: "Вес",
      Height: "Рост",
      "Activity Level": "Уровень активности",
      "Little / No exercise": "Низкий / Не занимаюсь спортом",
      "Light exercise (1–3 days per week)": "Невысокий (1-3 раза в неделю)",
      "Moderate exercise (3–5 days per week)": "Средний (3-5 раза в неделю)",
      "Heavy exercise (6–7 days per week)": "Высокий (6-7 раз в неделю)",
      "Very heavy exercise (twice per day, extra heavy workouts)":
        "Очень высокий (дважды в день, тяжелые упражения)",
      "Your goal": "Ваша цель",
      "Cut (-20%)": "Покудеть (-20%)",
      Maintain: "Сохранить вес",
      "Gain (+15%)": "Набрать вес (+15%)",
      Formula: "Формула",
      "The Original Harris-Benedict Equation": "Формула Харриса-Бенедикта",
      "The Mifflin St. Jeor Equation": "Формула Миффлина Ст. Джеора",
      Calculate: "Посчитать",
      "You will need": "Вам потребуется",
      "kcal to": "калорий, чтобы",
      cut: "похудеть",
      maintain: "сохранить вес",
      gain: "набрать вес",
    },
  },
  de: {
    translation: {
      "Personal data": "Ihre Daten",
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
