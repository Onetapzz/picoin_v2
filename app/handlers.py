from aiogram import F, Router
from aiogram.filters import CommandStart, Command
from aiogram.types import Message

import app.keyboards as kb

router = Router()


@router.message(CommandStart())
async def cmd_start(message: Message):
    await message.reply(f"Привет! Твой ID: {message.from_user.id}\nИмя: {message.from_user.first_name}",
                        reply_markup=await kb.inline_cars())
