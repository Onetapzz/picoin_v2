from aiogram import F, Router
from aiogram.filters import CommandStart, Command
from aiogram.types import Message

import app.keyboards as kb

router = Router()

@router.message(CommandStart())
async def cmd_start(message: Message):
    await message.reply(f"Привет! Твой ID: {message.from_user.id}\nИмя: {message.from_user.first_name}",
                        reply_markup=kb.settings)


@router.message(Command("help"))
async def cmd_help(message: Message):
    await message.answer('Всегда рад помочь!')


@router.message(F.text == 'Как дела?')
async def how_are_you(message: Message):
    await message.answer('Отлично!')


@router.message(Command("get_photo"))
async def get_photo(message: Message):
    await message.answer_photo(photo="AgACAgIAAxkBAAN1ZmRSag7WY-LESpFWFq240Sm5odwAAlPcMRshYCBLWFFf1aSbjOMBAAMCAAN4AAM1BA",
                               caption = "Классная фотка?")
