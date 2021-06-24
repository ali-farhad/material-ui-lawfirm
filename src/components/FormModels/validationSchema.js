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

    //company form
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
export default [
  Yup.object().shape(
    {
      [firstName.name]: Yup.string()
        .required(`${firstName.requiredErrorMsg}`)
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
      [middleName.name]: Yup.string().matches(
        /^[aA-zZ\s]+$/,
        "Only alphabets are allowed for this field "
      ),

      [lastName.name]: Yup.string()
        .required(`${lastName.requiredErrorMsg}`)
        .typeError(`${lastName.typeErrorMsg}`)
        .matches(/^[aA-zZ\s]+$/, "Only Letters are allowed for this field "),
      [username.name]: Yup.string().required(`${username.requiredErrorMsg}`),

      // [ph_number.name]: Yup.number()
      //   .required(`${ph_number.requiredErrorMsg}`)
      //   .typeError(`${ph_number.typeErrorMsg}`),

      // [mob_number.name]: Yup.number()
      //   .required(`${mob_number.requiredErrorMsg}`)
      //   .typeError(`${mob_number.typeErrorMsg}`),

      [ph_number.name]: Yup.string()
        .ensure()
        .when(`${[mob_number.name]}`, {
          is: "",
          then: Yup.string()
            .required(`${ph_number.requiredErrorMsg}`)
            .typeError(`${ph_number.typeErrorMsg}`),
        }),
      [mob_number.name]: Yup.string()
        .ensure()
        .when(`${[ph_number.name]}`, {
          is: "",
          then: Yup.string()
            .required(`${mob_number.requiredErrorMsg}`)
            .typeError(`${mob_number.typeErrorMsg}`),
        }),
      [web_url.name]: Yup.string(`${web_url.validUrlMsg}`),
      [linkadin_url.name]: Yup.string(`${linkadin_url.validUrlMsg}`),
      [fb_url.name]: Yup.string(`${fb_url.validUrlMsg}`),
      [twitter_url.name]: Yup.string(`${twitter_url.validUrlMsg}`),
    },
    [["ph_number", "mob_number"]]
  ),
  // Company Form
  Yup.object().shape({
    [cName.name]: Yup.string().required(`${cName.requiredErrorMsg}`),
    [cEmail.name]: Yup.string().email("Enter a valid Email Address"),
    // .required(`${cEmail.requiredErrorMsg}`),
    [cPhNumber.name]: Yup.number()
      .required(`${cPhNumber.requiredErrorMsg}`)
      .typeError(`${cPhNumber.typeErrorMsg}`),
    [cCountry.name]: Yup.string(),
    [cCity.name]: Yup.string().required(`${cCity.requiredErrorMsg}`),
    [cState.name]: Yup.string().required(`${cState.requiredErrorMsg}`),
    [cZip.name]: Yup.number()
      .required(`${cZip.requiredErrorMsg}`)
      .typeError(`${cZip.typeErrorMsg}`),
    [cAddress.name]: Yup.string().required(`${cAddress.requiredErrorMsg}`),
    [cSuit.name]: Yup.string(),
    [cNumOfAttornies.name]: Yup.number().typeError(
      `${cNumOfAttornies.typeErrorMsg}`
    ),
    [cNumOfEmp.name]: Yup.number().typeError(`${cNumOfEmp.typeErrorMsg}`),
    [cNumOfOffices.name]: Yup.number().typeError(
      `${cNumOfOffices.typeErrorMsg}`
    ),
  }),

  //Billing Form
  Yup.object().shape({
    [bankAcNum.name]: Yup.number()
      .required(`${bankAcNum.requiredErrorMsg}`)
      .typeError(`${bankAcNum.typeErrorMsg}`),

    [routingNum.name]: Yup.number()
      .required(`${routingNum.requiredErrorMsg}`)
      .typeError(`${routingNum.typeErrorMsg}`),

    // [cCardNum.name]: Yup.number()
    //   .required(`${cCardNum.requiredErrorMsg}`)
    //   .typeError(`${cCardNum.typeErrorMsg}`),

    // [cSecCode.name]: Yup.number()
    //   .required(`${cSecCode.requiredErrorMsg}`)
    //   .typeError(`${cSecCode.typeErrorMsg}`),

    // [expMonthYear.name]: Yup.string()
    //   .typeError("Not a valid expiration date. Example: MM/YY")
    //   .max(5, "Not a valid expiration date. Example: MM/YY")
    //   .matches(
    //     /([0-9]{2})\/([0-9]{2})/,
    //     "Not a valid expiration date. Example: MM/YY"
    //   )
    //   .test(
    //     "test-credit-card-expiration-date",
    //     "Invalid Expiration Date has past",
    //     (expirationDate) => {
    //       if (!expirationDate) {
    //         return false;
    //       }

    //       const today = new Date();
    //       const monthToday = today.getMonth() + 1;
    //       const yearToday = today.getFullYear().toString().substr(-2);

    //       const [expMonth, expYear] = expirationDate.split("/");

    //       if (Number(expYear) < Number(yearToday)) {
    //         return false;
    //       } else if (
    //         Number(expMonth) < monthToday &&
    //         Number(expYear) <= Number(yearToday)
    //       ) {
    //         return false;
    //       }

    //       return true;
    //     }
    //   )
    //   .test(
    //     "test-credit-card-expiration-date",
    //     "Invalid Expiration Month",
    //     (expirationDate) => {
    //       if (!expirationDate) {
    //         return false;
    //       }
    //       const today = new Date().getFullYear().toString().substr(-2);

    //       const [expMonth] = expirationDate.split("/");

    //       if (Number(expMonth) > 12) {
    //         return false;
    //       }

    //       return true;
    //     }
    //   )
    //   .required("Expiration date is required"),

    [bCountry.name]: Yup.string(),
    [bCity.name]: Yup.string(),
    [bState.name]: Yup.string(),

    [bZip.name]: Yup.number().typeError(`${bZip.typeErrorMsg}`),

    [bAddress.name]: Yup.string(),
    [bSuit.name]: Yup.string(),
  }),
];
