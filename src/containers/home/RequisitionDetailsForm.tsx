import { Button, Flex, Box } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent } from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData, initialValues } from "./DataProvider";

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      handleTab(1);
    },
  });

  // @ts-ignore
  const { state, setState } = useData();

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            setState({
              ...state,
              requisitionDetails: {
                ...state.requisitionDetails,
                [e.currentTarget.name]: e.currentTarget.value,
              },
            });
          }}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            setState({
              ...state,
              requisitionDetails: {
                ...state.requisitionDetails,
                [e.currentTarget.name]: e.currentTarget.value,
              },
            });
          }}
          onBlur={handleBlur}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
          value={values?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setFieldValue("gender", "Male");
            setState({
              ...state,
              requisitionDetails: {
                ...state.requisitionDetails,
                gender: "Male",
              },
            });
          }}
          onBlur={setFieldTouched}
          error={errors?.gender}
          touched={touched?.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setFieldValue("urgency", "immediate");
            setState({
              ...state,
              requisitionDetails: {
                ...state.requisitionDetails,
                urgency: "Urgent",
              },
            });
          }}
          onBlur={setFieldTouched}
          error={errors?.urgency}
          touched={touched?.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
