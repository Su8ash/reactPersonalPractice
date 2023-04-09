import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { Formik, FormikHelpers } from 'formik'
import React from 'react'
import { addNewPost } from '../../api';



const AddNewPost = () => {

    const cache = useQueryClient();

    const { isLoading, data, mutateAsync, } = useMutation(["addNewPost"], addNewPost, {
        onSuccess: () => {
            cache.invalidateQueries(["posts"]);
        },
        onError: () => {
            alert(`message`);
        }
    });

    return (
        <div>

            <Formik
                initialValues={{ title: '', body: '' }}
                validate={values => {
                    let errors: any = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }

                    if (!values.body) {
                        errors.body = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(values);

                    await mutateAsync({
                        title: values.title,
                        body: values.body,
                    })
                    setSubmitting(false);
                }}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="title"
                            name="title"
                            aria-label="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        /> <br />
                        {errors.title && touched.title && errors.title}
                        <br />
                        <input
                            type="body"
                            name="body"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.body}
                        /> <br />
                        {errors.body && touched.body && errors.body}
                        <br />
                        <button type="submit" disabled={isSubmitting}>
                            Upload
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default AddNewPost