//1 реализовать в header отображение чисел сделано или нет по нажатию
const dealYes = document.querySelector('.dealYes')
const dealNo = document.querySelector('.dealNo')
const spanYes = document.querySelector('#spanYes')
const spanNo = document.querySelector('#spanNo')

//добавление дел друг за другом
const sectionInput = document.querySelector('.section')
let sectionDeals = document.querySelector('.deals')
sectionDeals.innerHTML = localStorage.getItem('hiDen')
const dealNameInput = document.querySelector('#dealName')
const marksInput = document.querySelector('#marks')
const btn = document.querySelector('#button')
const btnYes = document.querySelector('#yes')
const btnNo = document.querySelector('#no')

//занечение в ls счетчиков и дел
let dealsCounterYes = 0
let dealsCounterNo = 0
let dealStorage = []
function setCounter() {
	let gettedCounterYes = localStorage.getItem('dealsCounterYes')
	let gettedCounterNo = localStorage.getItem('dealsCounterNo')
	if (gettedCounterYes > 0 || gettedCounterNo > 0) {//если что-то есть в localStorage, то берем оттуда, иначе заносим 0
		dealsCounterYes = gettedCounterYes
		dealsCounterNo = gettedCounterNo
		spanYes.innerText = ''
		spanYes.innerText = dealsCounterYes
		spanNo.innerText = ''
		spanNo.innerText = dealsCounterNo
		console.log(dealsCounterYes);
	} else {
		localStorage.setItem('dealsCounterYes', 0)
		localStorage.setItem('dealsCounterNo', 0)
	}
}
setCounter()

//функции добавления дел в localstorage и получения
function add_element(deal) {//при загрузке если что-то есть в ls то она берет это и выводит иначе break
	const parsed = deal.innerHTML
	let p = localStorage.setItem('hiDen', parsed)
	// return p
}

function get_element(deal) {
	// let ty =
	deal.innerHTML = localStorage.getItem('hiDen');
	// return ty
}

// function printDeals() {//выводит введённые дела в прошлой сесии
// 	sectionDeals = localStorage.getItem('hiDen')
// 	console.log(sectionDeals);

// }
// printDeals()

// выводит
// sectionDeals.append(get_element(sectionDeals))







btn.addEventListener('click', (event) => {
	event.preventDefault();
	const h2Input = dealNameInput.value
	const pInput = marksInput.value
	dealNameInput.value = ''
	marksInput.value = ''

	createDeal(h2Input, pInput)
})

function createDeal(inputname, inputmark) {
	// sectionDeals = localStorage.getItem('sectionDeals')//получение дел при перезагрузке

	const dealWrapper = document.createElement('div')
	dealWrapper.classList.add('deal')
	const divInputInfo = document.createElement('div')
	divInputInfo.classList.add('inputInfo')

	const inputName = document.createElement('div')
	inputName.classList.add('inputName')
	inputName.innerText = inputname
	const inputMark = document.createElement('div')
	inputMark.classList.add('inputMark')
	inputMark.innerText = inputmark

	const labels = document.createElement('div')
	labels.classList.add('labels')

	const yesDiv = document.createElement('div')
	const yes = document.createElement('button')
	yesDiv.append(yes)
	yes.setAttribute('id', 'yes')
	yes.innerText = '✓'

	const noDiv = document.createElement('div')
	const no = document.createElement('button')
	noDiv.append(no)
	no.setAttribute('id', 'no')
	no.innerText = '✘'

	divInputInfo.append(inputName, inputMark)
	labels.append(yesDiv, noDiv)
	dealWrapper.append(divInputInfo, labels)//append labels
	sectionDeals.append(dealWrapper)

	//сохраняет ваш элемент
	add_element(sectionDeals);


	return sectionDeals
}

function render1(section) {
	const dealsObj = [...section.children]
	dealsObj.map(element => {
		if (element.classList.contains('clickedYes')) {
			element.remove()
		}
	})
	localStorage.removeItem('hiDen')
	localStorage.setItem('hiDen', section.innerHTML)

}
function render2(section) {
	const dealsObj = [...section.children]
	dealsObj.map(element => {
		if (element.classList.contains('clickedNo')) {
			element.remove()
		}
	})
	localStorage.removeItem('hiDen')
	localStorage.setItem('hiDen', section.innerHTML)

}





sectionDeals.addEventListener('click', (event) => {
	event.preventDefault()
	// console.log(event.target.innerText);
	if (event.target.innerText === '✓') {
		let chi = event.target.parentNode.parentNode.parentNode.classList.add('clickedYes')
		dealsCounterYes = +dealsCounterYes + 1;
		spanYes.innerText = ''
		spanYes.innerText = dealsCounterYes

		localStorage.setItem('dealsCounterYes', dealsCounterYes)
		spanYes.innerText = dealsCounterYes
		render1(event.target.parentNode.parentNode.parentNode.parentNode) //вызываю функцию чтобы удалила чилда с классом clickedYes
	} else if (event.target.innerText === '✘') {
		let chi = event.target.parentNode.parentNode.parentNode.classList.add('clickedNo')
		dealsCounterNo = +dealsCounterNo + 1;
		spanNo.innerText = ''
		spanNo.innerText = dealsCounterNo

		localStorage.setItem('dealsCounterNo', dealsCounterNo)
		render2(event.target.parentNode.parentNode.parentNode.parentNode) //вызываю функцию чтобы удалила чилда с классом clickedNo
	}
})
