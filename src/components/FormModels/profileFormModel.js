// eslint-disable-next-line import/no-anonymous-default-export
export default {
  formId: "ProfileForm",
  formField: {
    firstName: {
      name: "firstName",
      label: "First name*",
      requiredErrorMsg: "First name is required!",
      typeErrorMsg: "Enter a valid name!",
    },
    middleName: {
      name: "middleName",
      label: "middle name",
      requiredErrorMsg: "",
      typeErrorMsg: "Enter a valid name!",
    },
    lastName: {
      name: "lastName",
      label: "Last name*",
      requiredErrorMsg: "Last name is required!",
      typeErrorMsg: "Enter a valid name!",
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
      typeErrorMsg: "Enter a valid Number",
    },
    mob_number: {
      name: "mob_number",
      label: "Mobile number*",
      requiredErrorMsg: "Mobile number is required",
      typeErrorMsg: "Enter a  valid Number",
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

    //Company Form
    cName: {
      name: "cName",
      label: "Company Name*",
      requiredErrorMsg: "This field is required",
    },
    cEmail: {
      name: "cEmail",
      label: "Company Email",
      requiredErrorMsg: "This field is required",
    },
    cPhNumber: {
      name: "cPhNumber",
      label: "Company Phone number*",
      typeErrorMsg: "Enter a valid Number",
      requiredErrorMsg: "This field is required",
    },
    cCountry: {
      name: "cCountry",
      label: "Company Country",
      requiredErrorMsg: "This field is required",
    },
    cCity: {
      name: "cCity",
      label: "Company City*",
      requiredErrorMsg: "This field is required",
    },
    cState: {
      name: "cState",
      label: "Company State*",
      requiredErrorMsg: "This field is required",
    },
    cZip: {
      name: "cZip",
      label: "Company Zip*",
      requiredErrorMsg: "This field is required",
      typeErrorMsg: "Enter a valid Number",
    },
    cAddress: {
      name: "cAddress",
      label: "Company Address*",
      requiredErrorMsg: "This field is required",
    },
    cSuit: {
      name: "cSuit",
      label: "Company Suit",
      requiredErrorMsg: "This field is required",
    },
    cNumOfAttornies: {
      name: "cNumOfAttornies",
      label: "Number of Attornies",
      requiredErrorMsg: "This field is required",
      typeErrorMsg: "Enter a  valid Number",
    },
    cNumOfEmp: {
      name: "cNumofEmp",
      label: "Number of Employees",
      requiredErrorMsg: "This field is required",
      typeErrorMsg: "Enter a  valid Number",
    },
    cNumOfOffices: {
      name: "cNumOfOffices",
      label: "Number of Offices",
      requiredErrorMsg: "This field is required",
      typeErrorMsg: "Enter a  valid Number",
    },

    //Billing Form
    bankAcNum: {
      name: "bankAcNum",
      label: "Bank Account Number*",
      requiredErrorMsg: "This field is required",
      typeErrorMsg: "Enter a  valid Number",
    },
    routingNum: {
      name: "routingNum",
      label: "Routing Number*",
      requiredErrorMsg: "This field is required",
      typeErrorMsg: "Enter a  valid Number",
    },
    cCardNum: {
      name: "cCardNum",
      label: "Credit Card Number*",
      requiredErrorMsg: "This field is required",
      typeErrorMsg: "Enter a  valid Credit Card Number",
    },
    cSecCode: {
      name: "cSecCode",
      label: "Security Code*",
      requiredErrorMsg: "This field is required",
      typeErrorMsg: "Enter a  valid Number",
    },
    expMonthYear: {
      name: "expMonthYear",
      label: "Expiry Month & Year*",
      requiredErrorMsg: "This field is required",
      typeErrorMsg: "Enter valid Date and Year",
    },
    bCountry: {
      name: "bCountry",
      label: "Business Country",
    },
    bCity: {
      name: "bCity",
      label: "Business City",
    },
    bState: {
      name: "bState",
      label: "Business State",
    },
    bZip: {
      name: "bZip",
      label: "Business Zip",
      typeErrorMsg: "Enter a valid Number",
    },
    bAddress: {
      name: "bAddress",
      label: "Business Address",
    },
    bSuit: {
      name: "bSuit",
      label: "Business Suit",
      typeErrorMsg: "Enter a valid Number",
    },
  },
};
