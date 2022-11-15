export function isSomeFieldEmpty(fields: unknown[]) {
  const isUndefined = fields.includes(undefined);
  const isEmptyString = fields.includes('');

  return isUndefined || isEmptyString;
}
