import {only_one, comma_one, basic_solutions, priority, solution, arrange} from './function.js';
import find_a_solution from './main_function.js';
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
document.querySelector('#percentages').addEventListener('click', () => { document.querySelector('#result').value = only_one(document.querySelector('#result').value, '%'); });
document.querySelector('#division').addEventListener('click', () => { document.querySelector('#result').value = only_one(document.querySelector('#result').value, '÷'); });
document.querySelector('#multiply').addEventListener('click', () => { document.querySelector('#result').value = only_one(document.querySelector('#result').value, '×'); });
document.querySelector('#minus').addEventListener('click', () => { document.querySelector('#result').value = only_one(document.querySelector('#result').value, '-'); });
document.querySelector('#plus').addEventListener('click', () => { document.querySelector('#result').value = only_one(document.querySelector('#result').value, '+'); });
document.querySelector('#comma').addEventListener('click', () => { document.querySelector('#result').value = comma_one(document.querySelector('#result').value, '.'); });

// События на клавиатуру
document.addEventListener('keydown', (event) => {
	if (event.keyCode == 8) {
		const text = document.querySelector('#result').value;
		document.querySelector('#result').value = text.substring(0, text.length - 1);
	} else if (event.key == '(' || event.key == ')') document.querySelector('#result').value += event.key;
	else if (event.key >= 0 && event.key <= 9) document.querySelector('#result').value += event.key;
	else if (event.key == '%' || event.key == '+' || event.key == '-') document.querySelector('#result').value = only_one(document.querySelector('#result').value, event.key);
	else if (event.key == '*') document.querySelector('#result').value = only_one(document.querySelector('#result').value, '×');
	else if (event.key == '/') document.querySelector('#result').value = only_one(document.querySelector('#result').value, '÷');
	else if (event.key == '.' || event.key == ',') document.querySelector('#result').value = comma_one(document.querySelector('#result').value, '.');
	else if (event.keyCode === 13) find_a_solution();
});

// Вывод результата
document.querySelector('#answer').addEventListener('click', find_a_solution);
