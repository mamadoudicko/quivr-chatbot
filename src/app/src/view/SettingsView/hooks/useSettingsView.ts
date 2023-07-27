import { useEffect, useState } from "react";
import { useBrains } from "../../../hooks/useBrains";




import { Settings, getSettings, saveSettings } from '../../../api/settings';

export const useSettingsView = () => {
  
  const [settings, setSettings] = useState<Settings>({
    apiKey: "",
    currentBrainId: "",
    logoUrl: "",
  });

  const [savedSettings, setSavedSettings] = useState<Settings>();

  const { brains } = useBrains();

  const currentBrain = brains.find((brain) => brain.id === savedSettings?.currentBrainId);

  // Call getSettings when the hook is first used to load the saved settings (if any)
  useEffect(() => {
    void loadSavedSettings();
  }, []);

  const loadSavedSettings = async () => {
    const storedSettings = await getSettings();
    if (storedSettings) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        ...storedSettings,
      }));
      setSavedSettings(storedSettings);
    }
  };

  const handleSaveSettings = async (settingsToSave: Settings) => {
    setSettings(settingsToSave);
    await saveSettings(settingsToSave);
  };

  return {
    settings,
    handleSaveSettings,
    currentBrain,
    savedSettings,
    setSettings,

  };
};
