/*------------------------------------
		ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
------------------------------------*/
const arr = ['+', '-', '×', '÷', '%'];
const { chai } = window;
const { expect } = chai;
/*------------------------------------
		ГЛОБАЛЬНЫЕ ФУНКЦИИ
------------------------------------*/
// Функция, которая позволяет выводить математические символы без ошибок (в одном экземпляре)
export function only_one(text, sign) {
	if (text === '' || (text === '-' && text.length === 1)) return '-';
	if (arr.includes(text.slice(-1))) return text.substring(0, text.length - 1) + sign;
	return text + sign;
}

// Функция для вывода только одной точки
export function comma_one(text, sign) {
	if (text.slice(-1) === '.') return text.substring(0, text.length - 1) + sign;
	return text + sign;
}

// Функция, которая выполняет стандартные математические операции
export function basic_solutions(a, b, sign) {
	switch (sign) {
	case '×': return +(a * b).toFixed(3);
	case '÷': return +(a / b).toFixed(3);
	case '+': return +(a + b).toFixed(3);
	case '-': return +(a - b).toFixed(3);
	case '%': return +(a % b).toFixed(3);
	default: break;
	}
}

// Функция приоритетов
export function priority(array, sign) {
	let id = array.indexOf(sign);
	while (id !== -1) {
		id = array.indexOf(sign);
		if (id === -1) break;
		if (id + 1 <= array.length) {
			array[id - 1] = basic_solutions(parseFloat(array[id - 1]), parseFloat(array[id + 1]), sign);
			array.splice(id, 2);
		} else return '';
	}

	return array;
}

// Функция решения
export function solution(array) {
	if (array.includes('÷')) array = priority(array, '÷');
	if (array.includes('%')) array = priority(array, '%');
	if (array.includes('×')) array = priority(array, '×');
	if (array.includes('+')) array = priority(array, '+');
	if (array.includes('-')) array = priority(array, '-');
	return array;
}

// Функция, которая делает массив более удобным
export function arrange(text) {
	let array = new Array();
	const result = text.split('');
	let temp = '';

	for (let i = 0; i < result.length; i++) {
		if (!isNaN(result[i])) temp += result[i];
		else {
			array.push(temp);
			array.push(result[i]);
			temp = '';
		}
	}

	if (temp !== '') array.push(temp);

	array = array.filter((n) => n);

	for (let i = 0; i < array.length; i++) {
		if (array[i] == '.') {
			if (!isNaN(array[i - 1]) && !isNaN(array[i + 1])) {
				array[i - 1] = `${array[i - 1]}.${array[i + 1]}`;
				array.splice(i, 2);
			} else if (!isNaN(array[i - 1]) && isNaN(array[i + 1])) {
				array[i - 1] = `${array[i - 1]}.` + '0';
				array.splice(i, 1);
			} else if (i == 0 && !isNaN(array[i + 1])) {
				array[0] = `${'0' + '.'}${array[i + 1]}`;
				array.splice(i + 1, 1);
			} else if (isNaN(array[i - 1]) && !isNaN(array[i + 1])) {
				array[i] = `${'0' + '.'}${array[i + 1]}`;
				array.splice(i + 1, 1);
			} else {
				array[i] = '0';
			}
		}
	}

	for (let i = 0; i < array.length; i++) {
		if (array[i] == '-' && i == 0) {
			if (!isNaN(array[i + 1])) {
				array[i + 1] = 0 - parseFloat(array[i + 1]);
				array.splice(i, 1);
			}
		} else if (array[i] == '-' && isNaN(array[i - 1]) && array[i - 1] != ')') {
			if (!isNaN(array[i + 1])) {
				array[i + 1] = 0 - parseFloat(array[i + 1]);
				array.splice(i, 1);
			}
		}
	}
	return array;
}

/*------------------------------------
			ТЕСТЫ
------------------------------------*/

describe('basic_solutions', () => {
	// Тест должен выполнить стандартные математические функции
	it('Тест должен выполнить стандартные математические функции - 1', () => {
		// Умножение
		expect(basic_solutions(2, 5, '×')).to.deep.equal(10);
		expect(basic_solutions(22, 15, '×')).to.deep.equal(330);
		expect(basic_solutions(56, -5, '×')).to.deep.equal(-280);
		expect(basic_solutions(23, 105, '×')).to.deep.equal(2415);
		expect(basic_solutions(11, 55, '×')).to.deep.equal(605);
		expect(basic_solutions(112, 7, '×')).to.deep.equal(784);
		expect(basic_solutions(49, 101, '×')).to.deep.equal(4949);

		// Деление
		expect(basic_solutions(22, 11, '÷')).to.deep.equal(2);
		expect(basic_solutions(57, 23, '÷')).to.deep.equal(2.478);
		expect(basic_solutions(12, 1, '÷')).to.deep.equal(12);
		expect(basic_solutions(123.3, 41.3, '÷')).to.deep.equal(2.985);
		expect(basic_solutions(159, 32, '÷')).to.deep.equal(4.969);
		expect(basic_solutions(-57, 11, '÷')).to.deep.equal(-5.182);
		expect(basic_solutions(-22, -13, '÷')).to.deep.equal(1.692);

		// Сложение
		expect(basic_solutions(2, 5, '+')).to.deep.equal(7);
		expect(basic_solutions(-2, 5, '+')).to.deep.equal(3);
		expect(basic_solutions(2, -5, '+')).to.deep.equal(-3);
		expect(basic_solutions(-2, -5, '+')).to.deep.equal(-7);
		expect(basic_solutions(225, 485, '+')).to.deep.equal(710);
		expect(basic_solutions(225.3, 485.03, '+')).to.deep.equal(710.33);
		expect(basic_solutions(225.02, -485.01, '+')).to.deep.equal(-259.99);

		// Вычитание
		expect(basic_solutions(123, 23, '-')).to.deep.equal(100);
		expect(basic_solutions(12.3, 23, '-')).to.deep.equal(-10.7);
		expect(basic_solutions(-123, 23, '-')).to.deep.equal(-146);
		expect(basic_solutions(123, -23, '-')).to.deep.equal(146);
		expect(basic_solutions(-123, -23, '-')).to.deep.equal(-100);
		expect(basic_solutions(-123.003, 23.2, '-')).to.deep.equal(-146.203);

		// Взятия остатка
		expect(basic_solutions(123, 23, '%')).to.deep.equal(8);
		expect(basic_solutions(123, 2, '%')).to.deep.equal(1);
		expect(basic_solutions(123, 3, '%')).to.deep.equal(0);
	});

	// Функция делает из строки удобный массив
	it('Тест должен выполнить стандартные математические функции - 2', () => {
		expect(arrange('2+5')).to.deep.equal(['2', '+', '5']);
		expect(arrange('5+95×7-3')).to.deep.equal(['5', '+', '95', '×', '7', '-', '3']);
		expect(arrange('5×√(6+3)-9')).to.deep.equal(['5', '×', '√', '(', '6', '+', '3', ')', '-', '9']);
		expect(arrange('6%2×9-33+458-(45×√(9))')).to.deep.equal(['6', '%', '2', '×', '9', '-', '33', '+', '458', '-', '(', '45', '×', '√', '(', '9', ')', ')']);
	});

	// Функция делает из строки удобный массив
	it('Тест должен выполнить стандартные математические функции - 3', () => {
		expect(priority(['5', '+', '6', '-', '33'], '+')).to.deep.equal([11, '-', '33']);
		expect(priority([11, '-', '33'], '-')).to.deep.equal([-22]);
		expect(priority([-3, '+', '4'], '+')).to.deep.equal([1]);
		expect(priority(['9', '+', 1], '+')).to.deep.equal([10]);
		expect(priority([-34, '+', '9', '×', 2], '×')).to.deep.equal([-34, '+', 18]);
		expect(priority([-34, '+', 18], '+')).to.deep.equal([-16]);
	});

	// Функция выполняет стандартные математические решения
	it('Тест должен выполнить стандартные математические функции - 4', () => {
		expect(solution(['5', '+', '9', '-', '3', '×', '8'])).to.deep.equal([-10]);
		expect(solution(['88', '-', '9', '×', 3])).to.deep.equal([61]);
		expect(solution(['61', '+', '3', '-', '8', '÷', '2', '%', '3'])).to.deep.equal([63]);
		expect(solution(['56', '×', '8'])).to.deep.equal([448]);
		expect(solution(['5', '-', '6', '×', '3', '+', 21.166010488516726])).to.deep.equal([-34.166]);
	});
});
