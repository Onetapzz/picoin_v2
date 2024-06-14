import * as telegram from './telegram.js'
import * as database from './database.js'

// КОНСТАНТЫ
const coin_object = document.getElementById('coin')
const coins_counter = document.getElementById('coins-counter')
const energy_current = document.getElementById('energy-current')
const energy_max = document.getElementById('energy-max')
const energy_fill = document.getElementById('energy-fill')

// ПЕРЕМЕННЫЕ
let energyIncreaseInterval
let energyBarUpdateInterval

// СЛУШАТЕЛИ СОБЫТИЙ
coin_object.addEventListener('click', Event => coinClick())

// ИНИЦИАЛИЗАЦИЯ
async function AppLoad() {
	telegram.telegramInit()

	userInfoLoad()

	energyIncreaseInterval = setInterval(() => energyIncrease(1), 1000)
	energyBarUpdateInterval = setInterval(() => energyBarUpdate(), 100)
}

async function userInfoLoad() {
	const telegram_id = 123
	const user = database.getUser(telegram_id)
	alert(user.coins)

	// try {
	// 	let username = user.telegram_username
	// 	let coins = user.coins
	// 	let energy = user.energy
	// 	let max_energy = user.max_energy
	// 	let hexagons = user.hexagons
	// 	let pentagons = user.pentagons
	// 	let squares = user.squares
	// 	let triangles = user.triangles
	// 	let circles = user.circles
	// } catch (error) {
	// 	throw error
	// }
}

// ОБРАБОТЧИК НАЖАТИЯ КНОПКИ
async function coinClick() {
	clearInterval(energyIncreaseInterval)
	coinsIncrease(user_click_power)
	energyDecrease(user_click_power)
	energyIncreaseInterval = setInterval(() => energyIncrease(1), 1000)
}

// ФУНКЦИЯ УВЕЛИЧЕНИЯ МОНЕТ
async function coinsIncrease(coinsAmount) {
	if (Number(energy_current.textContent) > 0) {
		coins_counter.textContent = Number(coins_counter.textContent) + coinsAmount
	}
}

// ФУНКЦИЯ УВЕЛИЧЕНИЯ ЭНЕРГИИ
async function energyIncrease(energyAmount) {
	if (Number(energy_current.textContent) < Number(energy_max.textContent)) {
		energy_current.textContent =
			Number(energy_current.textContent) + energyAmount
	}
}

// ФУНКЦИЯ УМЕНЬШЕНИЯ ЭНЕРГИИ
async function energyDecrease(energyAmount) {
	if (Number(energy_current.textContent) > 0) {
		energy_current.textContent =
			Number(energy_current.textContent) - energyAmount
	}
}

// ОБНОВЛЕНИЕ ПОЛОСЫ ЭНЕРГИИ
async function energyBarUpdate() {
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
