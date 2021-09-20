const { chai } = window;
const { expect } = chai;

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
