import { pipe } from 'lodash/fp';
import { produce } from 'immer';

const input = '    JavaScript    ';

const trim = str => str.trim();
const toLowerCase = str => str.toLowerCase();
const wrap = type => str => `<${type}>${str}</${type}>`;

const transform = pipe(trim, toLowerCase, wrap('span'));
const result = transform(input);
console.log(result);

let book = { title: 'Harry Potter' };

function publishBook(book) {
	return produce(book, draftBook => {
		draftBook.isPublished = true;
	});
}
const updated = publishBook(book);

console.log(book, updated);
