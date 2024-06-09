from aiogram import F, Router
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.types import Message

import app.keyboards as kb
import config

router = Router()



@router.message(CommandStart())
async def cmd_start(message: Message):
    await message.answer_photo(photo=config.START_BANNER,
                               caption=f"*Hello, @{message.from_user.username}! Welcome to PiCoin! 🥇*",
                               reply_markup=kb.main,
                               parse_mode=ParseMode.MARKDOWN)
