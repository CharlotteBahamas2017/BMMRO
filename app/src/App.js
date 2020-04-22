/** @jsx jsx */
import { Formik, Form } from "formik";
import { css, jsx } from "@emotion/core";

import Layout from "./components/Layout";
import Input from "./components/Input";

const fields = [
  { name: "date", label: "Date" },
  { name: "encSeqNo", label: "Enc Seq #" },
  { name: "species", label: "Species" },
];

const App = () => {
  return (
    <Layout>
      <h1>Hello BMMRO</h1>
      <Formik
        initialValues={{ [fields[0].name]: "", [fields[1].name]: "", [fields[2].name]: "" }}
        validate={(values) => {
          const errors = {};
          const errorMessage = "Required";
          if (!values.date) {
            errors.date = errorMessage;
          }
          if (!values.encSeqNo) {
            errors.encSeqNo = errorMessage;
          }
          if (!values.species) {
            errors.species = errorMessage;
          }
          return errors;
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, touched, values, errors }) => (
          <Form>
            {fields.map(({name, label}) => (
              <div
                css={css`
                  margin-bottom: 15px;
                `}
              >
                <Input
                  type="text"
                  name={name}
                  label={label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched[name]}
                  value={values[name]}
                  error={errors[name]}
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default App;
