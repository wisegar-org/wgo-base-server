export const minText = (
  description: string,
  maxLength: number,
  maxLines = 3
) => {
  let result = '';
  const resultSplit: string[] = [];
  let length = 0;
  const split = description.split('>');
  for (const str of split) {
    if (length < maxLength) {
      if (str.startsWith('<p')) resultSplit.push(str);
      else if (str.length <= maxLength - length) {
        resultSplit.push(str.substring(0, maxLength - length));
        length += str.length;
      } else {
        const exp = str.substring(0, maxLength - length).split(' ');

        resultSplit.push(exp.slice(0, exp.length - 1).join(' ') + '...</p>');
        length += str.length;
      }
    }
  }
  result = resultSplit.join('>');
  result = result
    .split('</p>')
    .slice(0, maxLines)
    .join('</p>');
  if (
    !result.endsWith('...') &&
    !result.endsWith('...</p>') &&
    result.length > maxLength
  )
    result += '...</p>';
  return result;
};
