const coin_obj = document.getElementById('coin')
const coin_obj_image = document.getElementById(`coin-image`)
const coins_counter = document.getElementById('coins_counter')
const energy_counter = document.querySelector('.energy_counter .energy_bold')
const energy_max_counter = document.getElementById('energy_max')
const progress_fill = document.querySelector('.energy-fill')

coin_obj.addEventListener('click', coin_click)

let maxEnergyValue = 1000
let energyIncreaseTimer

function Initialize() {
	energy_max_counter.textContent = maxEnergyValue
	updateProgressFill()
	energyIncreaseTimer = setInterval(() => increaseEnergy(), 1000)
}

function coin_click() {
	let coins_current_value = coins_counter.textContent.match(/^\d+/)[0]
	let energy_current_value = energy_counter.textContent
	let click_sound = new Audio('sound/click.mp3')

	if (Number(energy_current_value) - 1 >= 0) {
		clearInterval(energyIncreaseTimer)

		// Play click sound
		click_sound.volume = 0.1
		click_sound.play()

		// Change coin size
		coin_obj_image.style.width = '43vh'
		setTimeout(() => {
			coin_obj_image.style.width = '45vh'
		}, 50)

		// Update coins counter
		let coins_new_value = Number(coins_current_value) + 1
		coins_counter.innerHTML = `${coins_new_value}<span class="orange">π</span>`

		// Update energy counter
		let new_energy_value = Number(energy_current_value) - 1
		energy_counter.textContent = new_energy_value
		updateProgressFill()

		console.log('Coin clicked!')
		energyIncreaseTimer = setInterval(() => increaseEnergy(), 1000)
	}
}

function increaseEnergy() {
	let energy_current_value = Number(energy_counter.textContent)
	if (energy_current_value < maxEnergyValue) {
		energy_counter.textContent = energy_current_value + 1
		updateProgressFill()
	}
}

function updateProgressFill() {
	let energy_current_value = Number(energy_counter.textContent)
	let fill_percentage = (energy_current_value / maxEnergyValue) * 100
	progress_fill.style.width = `${fill_percentage}%`
}
