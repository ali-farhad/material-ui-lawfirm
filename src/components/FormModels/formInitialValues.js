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
export default {
  [firstName.name]: "",
  [middleName.name]: "",
  [lastName.name]: "",
  [username.name]: "",
  [ph_number.name]: "",
  [mob_number.name]: "",
  [web_url.name]: false,
  [linkadin_url.name]: "",
  [fb_url.name]: "",
  [twitter_url.name]: "",
};
