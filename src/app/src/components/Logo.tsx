import { getFaviconUrl } from "../utils/getFaviconUrl";
import { useSettingsView } from "../view/SettingsView/hooks/useSettingsView";

export const Logo = (): JSX.Element => {

    const {settings} = useSettingsView() ;

    return (
        <div className="h-10 w-10">
            <img className='w-full h-full' src={ settings.logoUrl !== "" ? settings.logoUrl : getFaviconUrl() ??  "https://upload.wikimedia.org/wikipedia/fr/d/dd/Logo-theodo.png"} />
        </div>

    )
}