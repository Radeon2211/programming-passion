export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps,
});

export const createCustomError = (error) => {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'You entered wrong password';
    default:
      return error.message;
  }
};

const fileTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
];

export const isValidFileType = (type) => fileTypes.includes(type);

export const calculateFileSize = (size) => {
  if (size < 1024) {
    return `${size} bytes`;
  }
  if (size >= 1024 && size < 1048576) {
    return `${(size / 1024).toFixed(1)}KB`;
  }
  if (size >= 1048576) {
    return `${(size / 1048576).toFixed(1)}MB`;
  }
};

export const isValidFileSize = (size) => size <= 1048576;
