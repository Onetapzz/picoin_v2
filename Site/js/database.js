const apiUrl = 'https://picoin.su/php/api.php?telegram_id=123'

export async function getUser(telegram_id) {
	let response = await fetch(apiUrl)
	let json = response.json()
	return json
}
