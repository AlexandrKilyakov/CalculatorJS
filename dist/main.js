/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/function.js":
/*!*************************!*\
  !*** ./src/function.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "only_one": () => (/* binding */ only_one),
/* harmony export */   "comma_one": () => (/* binding */ comma_one),
/* harmony export */   "basic_solutions": () => (/* binding */ basic_solutions),
/* harmony export */   "priority": () => (/* binding */ priority),
/* harmony export */   "solution": () => (/* binding */ solution),
/* harmony export */   "arrange": () => (/* binding */ arrange)
/* harmony export */ });
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
function only_one(text, sign) {
	if (text === '' || (text === '-' && text.length === 1)) return '-';
	if (arr.includes(text.slice(-1))) return text.substring(0, text.length - 1) + sign;
	return text + sign;
}

// Функция для вывода только одной точки
function comma_one(text, sign) {
	if (text.slice(-1) === '.') return text.substring(0, text.length - 1) + sign;
	return text + sign;
}

// Функция, которая выполняет стандартные математические операции
function basic_solutions(a, b, sign) {
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
function priority(array, sign) {
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
function solution(array) {
	if (array.includes('÷')) array = priority(array, '÷');
	if (array.includes('%')) array = priority(array, '%');
	if (array.includes('×')) array = priority(array, '×');
	if (array.includes('+')) array = priority(array, '+');
	if (array.includes('-')) array = priority(array, '-');
	return array;
}

// Функция, которая делает массив более удобным
function arrange(text) {
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


/***/ }),

/***/ "./src/main_function.js":
/*!******************************!*\
  !*** ./src/main_function.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ find_a_solution)
/* harmony export */ });
/* harmony import */ var _function_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function.js */ "./src/function.js");

// Основная функция
function find_a_solution() {
	const text = document.querySelector('#result').value;
	let arr_text = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.arrange)(text);
	const n = arr_text.length;
	let temp = '';

	if (text.length > 2 && (text.includes('-') || text.includes('+') || text.includes('×') || text.includes('÷') || text.includes('%') || text.includes('('))) {
		let temp_array = new Array();

		if (arr_text.includes('(') || arr_text.includes(')')) {
			let counter = 0;
			let border = 0;
			let id = 0;
			let number_of_open_brackets = text.split('(').length - 1;

			if (number_of_open_brackets == text.split(')').length - 1) {
				for (let i = 0; i < n; i++) {
					if (arr_text[i] == '(') {
						counter++;
						if (counter == number_of_open_brackets) {
							for (let j = i + 1; j < n; j++) {
								if (arr_text[j] == ')') {
									counter = 0;
									number_of_open_brackets--;
									border = j;
									j = n;
								} else temp_array.push(arr_text[j]);
							}
							temp_array = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.solution)(temp_array);
						}

						if (border > 0) {
							temp = (arr_text[i - 1] == '√') ? Math.sqrt(temp_array[0]) : parseFloat(temp_array);

							id = (arr_text[i - 1] == '√') ? i - 1 : i;

							arr_text[id] = temp;
							for (let j = id + 1; border > id; border--) arr_text.splice(j, 1);
							border = 0;
							i = -1;
							temp_array = [];
						}
						if (number_of_open_brackets == 0) i = n;
					}
				}
			} else {
				document.querySelector('#text').value = 'Не хватает скобок!';
				return 0;
			}
		}

		try {
			arr_text = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.solution)(arr_text);

			if (arr_text.length > 1 || isNaN(arr_text[0])) {
				document.querySelector('#text').value = 'Ошибка!';
				document.querySelector('#result').value = '';
			} else {
				document.querySelector('#text').value = document.querySelector('#result').value;
				document.querySelector('#result').value = arr_text[0];
			}
		} catch (err) {
			document.querySelector('#text').value = 'Не правильно записано уравнение!';
			document.querySelector('#result').value = '';
		}
	} else document.querySelector('#result').value = text;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _function_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function.js */ "./src/function.js");
/* harmony import */ var _main_function_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main_function.js */ "./src/main_function.js");


/*------------------------------------
		РАБОТА С КНОПКАМИ
------------------------------------*/

// Кнопка, которая очищает всё
document.querySelector('#clean').addEventListener('click', () => {
	document.querySelector('#result').value = '';
	document.querySelector('#text').value = '';
});

// Кнопка, для ввода чисел
document.querySelector('#nine').addEventListener('click', () => { document.querySelector('#result').value += '9'; });
document.querySelector('#eight').addEventListener('click', () => { document.querySelector('#result').value += '8'; });
document.querySelector('#seven').addEventListener('click', () => { document.querySelector('#result').value += '7'; });
document.querySelector('#six').addEventListener('click', () => { document.querySelector('#result').value += '6'; });
document.querySelector('#five').addEventListener('click', () => { document.querySelector('#result').value += '5'; });
document.querySelector('#four').addEventListener('click', () => { document.querySelector('#result').value += '4'; });
document.querySelector('#three').addEventListener('click', () => { document.querySelector('#result').value += '3'; });
document.querySelector('#two').addEventListener('click', () => { document.querySelector('#result').value += '2'; });
document.querySelector('#one').addEventListener('click', () => { document.querySelector('#result').value += '1'; });
document.querySelector('#two-zeros').addEventListener('click', () => { document.querySelector('#result').value += '00'; });
document.querySelector('#zero').addEventListener('click', () => { document.querySelector('#result').value += '0'; });
document.querySelector('#root').addEventListener('click', () => { document.querySelector('#result').value += '√('; });

// Кнопки, для ввода математических символов
document.querySelector('#percentages').addEventListener('click', () => { document.querySelector('#result').value = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.only_one)(document.querySelector('#result').value, '%'); });
document.querySelector('#division').addEventListener('click', () => { document.querySelector('#result').value = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.only_one)(document.querySelector('#result').value, '÷'); });
document.querySelector('#multiply').addEventListener('click', () => { document.querySelector('#result').value = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.only_one)(document.querySelector('#result').value, '×'); });
document.querySelector('#minus').addEventListener('click', () => { document.querySelector('#result').value = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.only_one)(document.querySelector('#result').value, '-'); });
document.querySelector('#plus').addEventListener('click', () => { document.querySelector('#result').value = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.only_one)(document.querySelector('#result').value, '+'); });
document.querySelector('#comma').addEventListener('click', () => { document.querySelector('#result').value = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.comma_one)(document.querySelector('#result').value, '.'); });

// События на клавиатуру
document.addEventListener('keydown', (event) => {
	if (event.keyCode == 8) {
		const text = document.querySelector('#result').value;
		document.querySelector('#result').value = text.substring(0, text.length - 1);
	} else if (event.key == '(' || event.key == ')') document.querySelector('#result').value += event.key;
	else if (event.key >= 0 && event.key <= 9) document.querySelector('#result').value += event.key;
	else if (event.key == '%' || event.key == '+' || event.key == '-') document.querySelector('#result').value = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.only_one)(document.querySelector('#result').value, event.key);
	else if (event.key == '*') document.querySelector('#result').value = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.only_one)(document.querySelector('#result').value, '×');
	else if (event.key == '/') document.querySelector('#result').value = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.only_one)(document.querySelector('#result').value, '÷');
	else if (event.key == '.' || event.key == ',') document.querySelector('#result').value = (0,_function_js__WEBPACK_IMPORTED_MODULE_0__.comma_one)(document.querySelector('#result').value, '.');
	else if (event.keyCode === 13) (0,_main_function_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

// Вывод результата
document.querySelector('#answer').addEventListener('click', _main_function_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

})();

/******/ })()
;
//# sourceMappingURL=main.js.map