import * as telegram from './telegram.js'

// КОНСТАНТЫ
const coin_object = document.getElementById('coin')
const coins_counter = document.getElementById('coins-counter')
const energy_current = document.getElementById('energy-current')
const energy_max = document.getElementById('energy-max')
const energy_fill = document.getElementById('energy-fill')

// ПЕРЕМЕННЫЕ
let energyIncreaseInterval

// СЛУШАТЕЛИ СОБЫТИЙ
coin_object.addEventListener('click', Event => coinClick())

// ИНИЦИАЛИЗАЦИЯ
function AppLoad() {
	energyBarUpdate()
	telegram.Telegram_Init()

	energyIncreaseInterval = setInterval(() => energyIncrease(1), 1000)
}

// ОБРАБОТЧИК НАЖАТИЯ КНОПКИ
function coinClick() {
	clearInterval(energyIncreaseInterval)
	energyBarUpdate()
	coinsIncrease(1)
	energyDecrease(1)
	energyIncreaseInterval = setInterval(() => energyIncrease(1), 1000)
}

// ФУНКЦИЯ УВЕЛИЧЕНИЯ МОНЕТ
function coinsIncrease(coinsAmount) {
	if (Number(energy_current.textContent) > 0) {
		coins_counter.textContent = Number(coins_counter.textContent) + coinsAmount
	}
}

// ФУНКЦИЯ УВЕЛИЧЕНИЯ ЭНЕРГИИ
function energyIncrease(energyAmount) {
	if (Number(energy_current.textContent) < Number(energy_max.textContent)) {
		energy_current.textContent =
			Number(energy_current.textContent) + energyAmount
	}
	energyBarUpdate()
}

// ФУНКЦИЯ УМЕНЬШЕНИЯ ЭНЕРГИИ
function energyDecrease(energyAmount) {
	if (Number(energy_current.textContent) > 0) {
		energy_current.textContent =
			Number(energy_current.textContent) - energyAmount
	}
	energyBarUpdate()
}

// ОБНОВЛЕНИЕ ПОЛОСЫ ЭНЕРГИИ
function energyBarUpdate() {
	let energy_current_num = Number(energy_current.textContent)
	let energy_max_num = Number(energy_max.textContent)
	energy_fill.style.width = `${
		(Number(energy_current_num) / energy_max_num) * 100
	}%`
}

// ВЫЗОВ ФУНКЦИИ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', event => {
	AppLoad()
})
