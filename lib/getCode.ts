/** https://github.com/cnrad/l */
export function getCode(length: number): string {
  let code: string = '';

  function randomChar(): string | number {
    let charCode = Math.floor(Math.random() * 62);
    if (charCode < 10 ) return charCode; // 0-9
    if (charCode < 36 ) return String.fromCharCode(charCode + 55); // A-Z
    return String.fromCharCode(charCode + 61); // a-z
  }

  while (code.length < length) code += randomChar();

  return code;
}