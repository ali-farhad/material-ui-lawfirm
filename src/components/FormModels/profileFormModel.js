// eslint-disable-next-line import/no-anonymous-default-export
export default {
  formId: "ProfileForm",
  formField: {
    firstName: {
      name: "firstName",
      label: "First name*",
      requiredErrorMsg: "First name is required!",
    },
    middleName: {
      name: "middleName",
      label: "middle name",
      requiredErrorMsg: "",
    },
    lastName: {
      name: "lastName",
      label: "Last name*",
      requiredErrorMsg: "Last name is required!",
    },
    username: {
      name: "username",
      label: "Username*",
      requiredErrorMsg: "userName is required",
      duplicateErrorMsg:
        "This userName is already taken. Please choose another one!",
    },
    ph_number: {
      name: "ph_number",
      label: "Phone number*",
      requiredErrorMsg: "Phone Number is required",
      numberErrorMsg: "Enter valid Number",
    },
    mob_number: {
      name: "mob_number",
      label: "Mobile number*",
      requiredErrorMsg: "Mobile number is required",
      numberErrorMsg: "Enter valid Number",
    },
    web_url: {
      name: "web_url",
      label: "website URL",
      requiredErrorMsg: "",
      validUrlMsg: "Please enter correct URL",
    },
    linkadin_url: {
      name: "linkadin_url",
      label: "Linkadin Profile URL",
      requiredErrorMsg: "",
      validUrlMsg: "Please enter correct URL",
    },
    fb_url: {
      name: "fb_url",
      label: "Facebook URL",
      requiredErrorMsg: "",
      validUrlMsg: "Please enter correct URL",
    },
    twitter_url: {
      name: "twitter_url",
      label: "Twitter URL",
      requiredErrorMsg: "",
      validUrlMsg: "Please enter correct URL",
    },
  },
};
