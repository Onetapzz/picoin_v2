from aiogram.types import (ReplyKeyboardMarkup, KeyboardButton,
                           InlineKeyboardMarkup, InlineKeyboardButton)

from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardBuilder

main = ReplyKeyboardMarkup(keyboard=[
    [KeyboardButton(text='Играть')]
],
    resize_keyboard=True,
    input_field_placeholder='Выберите пункт меню...')

settings = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text='🥇 Играть', url="https://google.com")]
])

cars = ['Tesla', 'Mercedes', 'BMW']


async def inline_cars():
    keyboard = InlineKeyboardBuilder()
    for car in cars:
        keyboard.add(InlineKeyboardButton(text=car, url=f"https://www.google.com/search?q={car}"))

    return keyboard.adjust(2).as_markup()
