const str = '123 abc 456';

const regexp = new RegExp('abc', 'gmi');
const regexp2 = new RegExp('test', 'gmi');
console.log(regexp.test(str));
console.log(regexp2.test(str));

const str2 = 'Geek from Geekbrains';
const regexp3 = new RegExp('Geek', 'gmi');
console.log(str2.match(regexp3));

const str3 = str2.replace(regexp3, '+');
console.log(str3);

const str4 = 'Hi I am Greek Geek from Geekbrains';
const regexp4 = new RegExp('g.+?k', 'gi');
console.log(str4.replace(regexp4, '+$1+'));

const str5 = '000 1221 1333333331';
const regexp5 = new RegExp('1.+?1', 'g');
console.log(str5.match(regexp5));

