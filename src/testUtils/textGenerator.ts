export function textGenerator(length: number = 0) {
  let text = '';
  for (let i = 0; i < length; i += 1) {
    text = `${text}a`;
  }

  return text;
}
