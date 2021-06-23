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

    //Company Form
    cName,
    cEmail,
    cPhNumber,
    cCountry,
    cCity,
    cState,
    cZip,
    cAddress,
    cSuit,
    cNumOfAttornies,
    cNumOfEmp,
    cNumOfOffices,

    //Billing Form
    bankAcNum,
    routingNum,
    // cCardNum,
    // cSecCode,
    // expMonthYear,
    bCountry,
    bCity,
    bState,
    bZip,
    bAddress,
    bSuit,
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
  [web_url.name]: "",
  [linkadin_url.name]: "",
  [fb_url.name]: "",
  [twitter_url.name]: "",
  //Company Form
  [cName.name]: "",
  [cEmail.name]: "",
  [cPhNumber.name]: "",
  [cCountry.name]: "",
  [cCity.name]: "",
  [cState.name]: "",
  [cZip.name]: "",
  [cAddress.name]: "",
  [cSuit.name]: "",
  [cNumOfAttornies.name]: "",
  [cNumOfEmp.name]: "",
  [cNumOfOffices.name]: "",

  //Billing Form
  [bankAcNum.name]: "",
  [routingNum.name]: "",
  // [cCardNum.name]: "",
  // [cSecCode.name]: "",
  // [expMonthYear.name]: "",
  [bCountry.name]: "",
  [bCity.name]: "",
  [bState.name]: "",
  [bZip.name]: "",
  [bAddress.name]: "",
  [bSuit.name]: "",
};
