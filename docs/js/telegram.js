export function Telegram_Init() {
	// Инициализация Telegram Web App
	let tg = window.Telegram.WebApp
	tg.expand()

	// Получение данных пользователя
	let user = tg.initDataUnsafe.user
	if (user) {
		console.log('User ID: ', user.id)
		console.log('First Name: ', user.first_name)
		console.log('Last Name: ', user.last_name)
		console.log('Username: ', user.username)
	} else {
		console.log('Пользователь не авторизован')
	}
}
