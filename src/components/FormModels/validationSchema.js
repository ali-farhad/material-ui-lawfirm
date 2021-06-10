import * as Yup from "yup";
import profileFormModel from "./profileFormModel";

const {
  formField: {
    firstName,
    middleName,
    lastName,
    username,
    ph_number,
    mob_number,
    web_url,
    linkadin_url,
    fb_url,
    twitter_url,
  },
} = profileFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [username.name]: Yup.string().required(`${username.requiredErrorMsg}`),
    [ph_number.name]: Yup.number(`${ph_number.numberErrorMsg}`).required(
      `${ph_number.requiredErrorMsg}`
    ),
    [mob_number.name]: Yup.number(`${mob_number.numberErrorMsg}`).required(
      `${mob_number.requiredErrorMsg}`
    ),
    [web_url.name]: Yup.string(`${web_url.validUrlMsg}`),
    [linkadin_url.name]: Yup.string(`${linkadin_url.validUrlMsg}`),
    [fb_url.name]: Yup.string(`${fb_url.validUrlMsg}`),
    [twitter_url.name]: Yup.string(`${twitter_url.validUrlMsg}`),
  }),
];
