import React from 'react'
import classNames from './SendForm.module.css'
import * as yup from 'yup'
import { withFormik, Field, Form } from 'formik'
import { Row } from '../../../Login/Row/Row'

const SendForm = ({ errors, touched, submitForm }) => {
  const onKeyDown = (e) => {
    if (e.key !== 'Enter' || e.shiftKey) return
    e.preventDefault()
    submitForm()
  }
  return (
    <Form className={classNames.posts}>
      <Row hasError={errors.message && touched.message} className={classNames.textarea}>
        <Field
          component="textarea"
          name={'message'}
          onKeyDown={onKeyDown}
          placeholder={'Type new message'}
        />
      </Row>
      <button type="submit">Send</button>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues() {
    return {
      message: '',
    }
  },
  handleSubmit({ message }, { resetForm, props: { sendMessage } }) {
    sendMessage(message)
    resetForm()
  },
  validationSchema: yup.object().shape({
    message: yup.string().max(500).min(1).required(),
  }),
})(SendForm)
