export const requiredValidator = (value: any) => (!!value && String(value).trim().length ? undefined : 'Required');

export const emailValidator = (value: string) => {
  return !!value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(String(value))
    ? undefined
    : 'Invalid email address';
};
