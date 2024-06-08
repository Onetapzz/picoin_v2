from aiogram import F, Router
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.types import Message

import app.keyboards as kb

router = Router()


@router.message(CommandStart())
async def cmd_start(message: Message):
    await message.answer("*Hello! Welcome to PiCoin! 🥇*",
                        reply_markup=kb.main, parse_mode=ParseMode.MARKDOWN)
