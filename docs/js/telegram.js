let tg
function telegramInit() {
	try {
		tg = window.Telegram.WebApp
		tg.expand()
	} catch {
		console.log(1)
	}
}

function telegramGetUserId() {
	let user = tg.initDataUnsafe.user
	if (user) {
		return user.id
	} else {
		console.log('Пользователь не авторизован')
	}
}

export { telegramInit, telegramGetUserId }
