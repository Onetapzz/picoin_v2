async function getUser(telegramId) {
	try {
		const response = await fetch(
			`http://app.coin.pi.com/php/api.php/user/${telegramId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		if (!response.ok) {
			throw new Error('Network response was not ok ' + response.statusText)
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error)
	}
}

async function addUser(telegramId, telegramUsername) {
	try {
		const response = await fetch('http://app.coin.pi.com/php/api.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				telegram_id: telegramId,
				telegram_username: telegramUsername,
			}),
		})
		if (!response.ok) {
			throw new Error('Network response was not ok ' + response.statusText)
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error)
	}
}

async function updateUser(telegramId, data) {
	try {
		const response = await fetch('http://app.coin.pi.com/php/api.php', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				telegram_id: telegramId,
				data: data,
			}),
		})
		if (!response.ok) {
			throw new Error('Network response was not ok ' + response.statusText)
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error)
	}
}

export { getUser, addUser, updateUser }
