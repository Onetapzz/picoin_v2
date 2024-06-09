from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

import config

web_app = WebAppInfo(url=config.WEBAPP_LINK)

main = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text='🥇 Play now!', web_app=web_app)],
        [InlineKeyboardButton(text='👋 Our community', url=config.COMMUNITY_LINK)],
    ],
    resize_keyboard=True
)
