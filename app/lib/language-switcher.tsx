import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { supportedLanguages } from "~/localization/resource";

export function LanguageSwitcher() {
    const { i18n } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value
        const params = new URLSearchParams(location.search)
        params.set('lng', lang)
        navigate(`${location.pathname}?${params.toString()}`, { replace: true })
        i18n.changeLanguage(lang)
    }

    return (
        <div className="flex items-center gap-2 p-2">
            <select onChange={handleChange} value={i18n.language}>
                {supportedLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </div>
    )
}