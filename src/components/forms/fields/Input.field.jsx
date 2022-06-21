import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { useField, ErrorMessage } from 'formik'

function InputField (props) {
    const [field, meta] = useField(props)
    return (
        <>
            <FormControl id={field.name}>
                <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
                <Input {...field} {...props} value={meta.value} isInvalid={meta.touched && meta.error} errorBorderColor='crimson'/>
                <Text pt='1' fontSize='sm' color={'crimson'}>
                    <ErrorMessage name={field.name} component="span"/>
                </Text>
            </FormControl>
        </>
    )
}

export default InputField

InputField.propTypes = {
    label: PropTypes.string.isRequired
}
