import { getFaviconUrl } from "../utils/getFaviconUrl";
import { useSettingsView } from "../view/SettingsView/hooks/useSettingsView";

export const Logo = (): JSX.Element => {

    const {settings} = useSettingsView() ;

    let logoUrl = getFaviconUrl() ?? '';


 
    if (logoUrl === '' ) {
        logoUrl = settings.logoUrl !== '' ? settings.logoUrl:   "https://upload.wikimedia.org/wikipedia/fr/d/dd/Logo-theodo.png"
    }
    
    return (
        <div className="h-10 w-10">
            <img className='w-full h-full' src={logoUrl} />
        </div>
    )
}