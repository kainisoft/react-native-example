export const phoneValidator = (value: string) => {
  return value && String(value).length === 10
    ? undefined
    : 'Invalid phone number';
};

export const avatarValidator = (uriObject: any) => {
  return uriObject && Object(uriObject) === uriObject ? undefined : 'Avatar required';
};
