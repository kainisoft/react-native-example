export const phoneFormatter = (value: string) => {
  if (!value) {
    return value;
  }

  switch (value.length) {
    case 1:
    case 2:
    case 3:
    case 4:
      return value;
    case 5:
    case 6:
      return `(${value.substr(0, 4)}) ${value.substr(4, 2)}`;
    case 7:
    case 8:
      return `(${value.substr(0, 4)}) ${value.substr(4, 2)}-${value.substr(6, 2)}`;
    case 9:
    case 10:
    default:
      return `(${value.substr(0, 4)}) ${value.substr(4, 2)}-${value.substr(6, 2)}-${value.substr(8, 2)}`;
  }
};
