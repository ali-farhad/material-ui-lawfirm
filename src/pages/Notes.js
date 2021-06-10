import { Typography } from "@material-ui/core";
import React from "react";

import { Formik, Form } from "formik";

import BillingForm from "../components/Forms/BillingForm";
import profileFormModel from "../components/FormModels/profileFormModel";
import formInitialValues from "../components/FormModels/formInitialValues";
import currentValidationSchema from "../components/FormModels/validationSchema";

const { formField } = profileFormModel;

export default function Notes() {
  return (
    <div style={{ maxWidth: "60em", margin: "5em auto" }}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={currentValidationSchema[2]}
        // onSubmit={_handleSubmit}
      >
        <Form style={{ maxWidth: "60em", margin: "1.3em auto" }}>
          <BillingForm formField={formField} />
        </Form>
      </Formik>
    </div>
  );
}
