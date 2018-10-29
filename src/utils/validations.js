export const validateName = name => {
  const valid = /^[a-zA-Z ]*$/.test(name);

  return {
    valid,
    error: !!name.trim() ? (valid ? undefined : 'Invalid name.') : 'Required.',
  };
};

export const validateEmail = email => {
  const valid = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);

  return {
    valid,
    error: !!email.trim() ? (valid ? undefined : 'Invalid email.') : 'Required.',
  };
};

export const validatePassword = password => {
  const valid = password.trim().length >= 8;

  return {
    valid,
    error: !!password.trim() ? (valid ? undefined : 'Password must be 8 characters long.') : 'Required.',
  };
};
