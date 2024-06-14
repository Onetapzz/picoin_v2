let tg
export function telegramInit() {
	try {
		tg = window.Telegram.WebApp
		tg.expand()
	} catch {
		console.log(1)
	}
}

export function telegramGetUserId() {
	let user = tg.initDataUnsafe.user
	if (user) {
		return user.id
	} else {
		console.log('Пользователь не авторизован')
	}
}

export function telegramGetUsername() {
	let user = tg.initDataUnsafe.user
	if (user) {
		return user.username
	} else {
		console.log('Пользователь не авторизован')
	}
}
