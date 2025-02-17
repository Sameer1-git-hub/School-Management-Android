import { useState } from 'react';
const yup = require('yup');

const Validations = (UserName, Password) => {
    const [error, setError] = useState('');

    const usernameSchema = yup.string()
        .required('Username is required')
        // .min(4, 'Name should be 4-12 characters')
        // .max(15, 'Name should be 4-12 characters');

    const passwordSchema = yup.string()
        .required('Password is required')
        .min(5, 'Password should be 6-10 characters')
        .max(8, 'Password should be 6-10 characters');

    const handleUsernameValidation = () => {
        usernameSchema.validate(UserName)
            .then(() => {
                if (error.toLowerCase().includes("name")) {
                    setError('');
                }
            })
            .catch(err => {
                setError(err.errors[0]);
            });
    };

    const handlePasswordValidation = () => {
        passwordSchema.validate(Password)
            .then(() => {
                if (error.toLowerCase().includes("password")) {
                    setError('');
                }
            })
            .catch(err => {
                setError(err.errors[0]);
            });
    };

    const checkDisable = () => {
        return error.toLowerCase().includes("valid") || UserName.length > 5 ? false : true
    }

    return {
        handleUsernameValidation,
        handlePasswordValidation,
        checkDisable,
        error,
    };
}

export default Validations;
