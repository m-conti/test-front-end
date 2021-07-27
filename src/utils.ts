export const checkFieldName = (value: string): boolean => /^\w+\s*\w*$/.test(value);
export const checkFieldUsername = (value: string): boolean => /^[\w.]+$/.test(value);
