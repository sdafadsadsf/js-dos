import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { State } from "./store";

const translations: {[lang: string]: {[key: string]: string} } = {
    ru: {
        logout: "Выйти",
        please_login: "Войдите в аккаунт",
        features: "Функции",
        premium: "Премиум",
        buy: "Купить",
        experimental_features: "Доступ к экспериентальным функциям",
        cloud_saves: "Облачные сохранения",
        game_no_limits: "Любой размер игры",
        net_no_limits: "Безлимитные сетевые игры",
        unlock_options: "Доступ ко всем настройкам",
        error: "Упс... Что-то пошло не так...",
        consult_logs: "Проверьте логи браузера",
        bundle_loading: "Загрузка бандла",
        bundle_config: "Чтение конфигурации",
        try_free: "дней бесплатно",
        upload_file: "Выбирите архив jsdos/zip что бы начать...",
        emulation_backend: "Эмуляция",
        render_backend: "Рендер",
        render_aspect: "Соотношение сторон",
        worker: "Фоновый поток",
        mouse_sensitivity: "Чувст. мыши",
        mouse_lock: "Захват мыши",
        volume: "Громкость",
        pause: "Пауза",
        dosboxconf_template: "dosbox.conf шаблон:",
        preview: "Превью",
        continue: "Продолжить",
        skip: "Пропустить",
        loading: "Загрузка",
        extract_loading: "Распаковка архива",
        extract_long_time: "Может занять длительное время, пожалуйста ждите...",
        theme: "Тема",
        create_empty: "Создать пустой бандл",
        uploading_file: "Загрузка файла",
        fs_restart: "Вы хотите пересобрать бандл используя эту FS?",
        please_wait: "Пожалуйста подождите",
        making_bundle: "Создаем бандл",
        size: "Размер",
        room: "Команта",
        server: "Сервер",
        load_by_url: "Загрузить по ссылке",
        enter_url: "Введите ссылку",
        load: "Загрузить",
        stored: "Сохраненные",
        delete: "Удалить",
        editor: "Редактор",
        download: "Скачать",
        changes: "Сохранения",
        account_not_ready: "Пропустить загрузку сохранений",
        loading_saves: "Загрузка сохранений",
        success: "Успешно",
        unable_to_save: "Ошибка записи",
        not_premium: "Ограниченный функционал",
    },
    en: {
        logout: "Logout",
        please_login: "Please login",
        features: "Features",
        premium: "Premium",
        buy: "Buy",
        experimental_features: "Access to all experimental features",
        cloud_saves: "Cloud saves",
        game_no_limits: "Unlimited game size",
        net_no_limits: "No limits for multiplayer games",
        unlock_options: "Unlock all configuration options",
        error: "Oops... Something went wrong...",
        consult_logs: "Please check browser logs",
        bundle_loading: "Bundle loading",
        bundle_config: "Reading config",
        try_free: "days for free",
        upload_file: "Select jsdos/zip file to start...",
        emulation_backend: "Emulation",
        render_backend: "Render",
        render_aspect: "Aspect",
        worker: "Worker thread",
        mouse_sensitivity: "Mouse sens...",
        mouse_lock: "Capture mouse",
        volume: "Volume",
        pause: "Pause",
        dosboxconf_template: "dosbox.conf template:",
        preview: "Preview",
        continue: "Continue",
        skip: "Skip",
        loading: "Loading",
        extract_loading: "Unpacking archive",
        extract_long_time: "Can take long time, please be patient...",
        theme: "Theme",
        create_empty: "Create empty bundle",
        uploading_file: "Uploading file",
        fs_restart: "Do you want to rebuild the bundle using this fs?",
        please_wait: "Please wait",
        making_bundle: "Creating bundle",
        size: "Size",
        room: "Room",
        server: "Server",
        load_by_url: "Load by url",
        enter_url: "Enter url",
        load: "Load",
        stored: "Stored",
        delete: "Delete",
        editor: "Editor",
        download: "Download",
        changes: "Saves",
        account_not_ready: "Skip loading saves",
        loading_saves: "Loading saves",
        success: "Success",
        unable_to_save: "Unable to save",
        not_premium: "Limited functionality",
    },
};

const initialLang = navigator.language.startsWith("ru") ? "ru" : "en";

const initialState: {
    lang: "ru" | "en",
    keys: {[key: string]: string},
} = {
    lang: initialLang,
    keys: translations[initialLang],
};

export const i18nSlice = createSlice({
    name: "i18n",
    initialState,
    reducers: {
        setLang: (state, action: { payload: "ru" | "en" }) => {
            state.lang = action.payload;
            state.keys = translations[action.payload];
        },
    },
});

export function useT() {
    const keys = useSelector((state: State) => state.i18n.keys);
    return (key: string) => {
        return keys[key] ?? key;
    };
};

