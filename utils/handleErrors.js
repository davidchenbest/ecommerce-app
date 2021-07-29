function handleErrors(err) {
    let errors = {}
    if (err.code === 11000) {
        errors.username = `${Object.keys(err.keyValue)} is already registered`;
        return errors;
    }
    if (err.message === 'incorrect username') {
        errors.username = 'Incorrect Credentials';
    }
    if (err.message === 'incorrect password') {
        errors.password = 'Incorrect Credentials';
    }
    if (err.errors) {
        const keys = Object.keys(err.errors)
        keys.forEach(k => {
            errors[k] = err.errors[k].message
        });
    }
    return errors
}

module.exports = { handleErrors }