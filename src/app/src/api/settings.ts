export type Settings = {
  apiKey: string;
  currentBrainId: string; // Change from string to UUID for currentBrainId
  logoUrl: string;
};

export const saveSettings = async (settings: Settings) => {
  try {
    // Save the specified keys to local storage or Chrome extension storage
    const { apiKey, currentBrainId, logoUrl } = settings;
    const settingsToSave = { apiKey, currentBrainId, logoUrl };

    if (process.env.NODE_ENV === "development") {
      localStorage.setItem("settings", JSON.stringify(settingsToSave));
    } else {
      await chrome.storage.local.set({ settings: settingsToSave });
    }
    window.location.reload();
  } catch (error) {
    // Handle error (e.g., display a message to the user)
    console.error("Error saving settings:", error);
  }
};

export const getSettings = async () => {
  try {
    // Get the settings from local storage or Chrome extension storage
    let storedSettings: Settings;

    if (process.env.NODE_ENV === "development") {
      const storedSettingsStr = localStorage.getItem("settings");
      storedSettings = storedSettingsStr ? JSON.parse(storedSettingsStr) : null;
    } else {
      const { settings: chromeStoredSettings } = await chrome.storage.local.get("settings");
      storedSettings = chromeStoredSettings ? chromeStoredSettings : null;
    }

    return storedSettings;
  } catch (error) {
    // Handle error (e.g., display a message to the user)
    console.error("Error getting settings:", error);
    return null;
  }
};
