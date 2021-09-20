import {solution, arrange} from './function.js';
// Основная функция
export default function find_a_solution() {
	const text = document.querySelector('#result').value;
	let arr_text = arrange(text);
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
							temp_array = solution(temp_array);
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
			arr_text = solution(arr_text);

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