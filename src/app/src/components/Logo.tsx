import { useEffect, useState } from "react";
import { getFaviconUrl } from "../utils/getFaviconUrl";
import { useSettingsView } from "../view/SettingsView/hooks/useSettingsView";

export const Logo = (): JSX.Element => {

    const {settings} = useSettingsView() ;
    const [faviconUrl, setFaviconUrl] = useState<string>() ;

    useEffect(() => {
        const fetchFavicon = async () => {
            const favicoLink = await getFaviconUrl() ;
            if(favicoLink !== null && favicoLink !== undefined) {
                setFaviconUrl(favicoLink) ;
            }
        }
        void fetchFavicon();
    },[])
    
    let logoUrl = faviconUrl ;

    if (logoUrl === undefined && settings.logoUrl !== '' ) {
        logoUrl = settings.logoUrl 
    }
    
    return (
        <div className="h-10 w-10">
            <img className='w-full h-full' src={logoUrl ?? "https://upload.wikimedia.org/wikipedia/fr/d/dd/Logo-theodo.png"} />
        </div>
    )
}