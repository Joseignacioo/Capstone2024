export default {
    id: {
        lengthId: {error: 'the id must have a length 36', code: 'E-01'}
    },
    firstName: {
        requiredFirstName: { error: 'The firstname is required', code: 'BOF-01' },
        lenghtFirstName: {error: ' The firstName must have a minimum of 2 and a maximum of 20 Characters', code: 'BOF-02'},
    },
    lastName: {
    requiredLastName: { error: 'The lastname is required', code: 'BOF-03' },
    lenghLastName: {error: ' The lastName must have a minimum of 2 and a maximum of 20 Characters', code: 'BOF-04'},
    },
    email: {
    invalidEmail: { error: 'The email is invalid', code: 'BOF-05' },
    },
    password: {
    lengthPassword: {error: 'The password must have a minimum of 6 and a maximum of 20 Characters', code: 'BOF-06'},
    hasUpperCasePassword: {error: 'The password field must contain at least one uppercase letter', code: 'BOF-07'},
    hasLowerCasePassword: {error: 'The password field must contain at least one lowercase letter', code: 'BOF-08'},
    hasNumberPassword: {error: 'The password field must contain at least one number', code: 'BOF-09'},
    },
    role: {
    invalidRole: { error: 'The role field must be equal to ADMIN, USER, GUEST', code: 'BOF-10' },
    },
    
}