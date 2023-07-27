import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { saveSettings } from "../../api/settings";
import { Logo } from "../../components/Logo";
import { useBrains } from "../../hooks/useBrains";
import { getCurrentWebsiteRawText } from "../../utils/getCurrentWebsiteRawText";
import { useSettingsView } from "./hooks/useSettingsView";
type SettingsViewProps = {
  close: () => void;
};

export const SettingsView = ({ close }: SettingsViewProps) => {
  const { settings,currentBrain,savedSettings,  setSettings,  } = useSettingsView();
  const {brains,fetchingBrains,isDeleting, isCrawling,deleteBrain, crawlCurrentWebsite: crawCurrentWebsite, createBrain,fetchBrains,errorMessage} = useBrains()

  const [creatingNewBrain, setCreatingNewBrain] = useState(false);
    const [newBrainName, setNewBrainName] = useState("");

const isBrainSelected = currentBrain?.id !== undefined;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value   } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleCrawlWebsite = async () => {
    if(currentBrain?.id === undefined) return ;
    const currentWebsiteContent =  getCurrentWebsiteRawText()
    await crawCurrentWebsite(currentBrain?.id , currentWebsiteContent)
  };

  const handleCreateNewBrain =async  () => {
    setCreatingNewBrain(true);
    try {

      const newCreatedBrain =  await createBrain(newBrainName) ;
      await fetchBrains()
      const updatedSettings = {
         ...settings,
        currentBrainId: newCreatedBrain.id,
      }
      setSettings(updatedSettings);

    saveSettings(updatedSettings)

    }
    catch (e) {
      console.error(e);
    }
    finally {
      setCreatingNewBrain(false);
    }
  };

  const handleSaveClick = () => {
    saveSettings(settings);
    close(); // Close the settings view after saving
  };


  if(savedSettings?.apiKey === "" || savedSettings?.apiKey === undefined){
    return (
      <div className="flex overflow-hidden flex-col flex-1 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between mb-4 border-b-2 border-[#f9f9f9]">
          <div className="flex items-center">
            <Logo />
            <Dialog.Title className="text-lg font-semibold text-center text-black ml-2">
              { currentBrain?.name ?? "Assistant 🤖"}
            </Dialog.Title>
          </div>
          <div>
            <button
              className="font-bold text-black focus:outline-none"
              onClick={close}
            >
              x
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
              
          <section className="mb-6">
            <div className="mb-4">
              <label htmlFor="apiKey" className="block mb-1">
                Quivr API Key:
              </label>
              <input
                type="text"
                id="apiKey"
                name="apiKey"
                value={settings.apiKey}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              />
            </div>
          </section>
        </div>
         <div className="flex items-end justify-end mt-4 space-x-4 border-t-2 border-[#f5f5f5] pt-2">
        <button
          className="px-4  py-2 font-bold text-white bg-black rounded-lg focus:outline-none"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
      </div>
    )}

  if (fetchingBrains) {
    return (
      <div className="flex flex-col w-full flex-1 align-center justify-center">
        <p className="text-center">Loading...</p>
      </div>      

  )}

  return (
    <div className="flex overflow-hidden flex-col flex-1 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4 border-b-2 border-[#f9f9f9]">
        <div className="flex items-center">
          <Logo />
          <Dialog.Title className="text-lg font-semibold text-center text-black ml-2">
            { currentBrain?.name ?? "Assistant 🤖"}
          </Dialog.Title>
        </div>
        <div>
          <button
            className="font-bold text-black focus:outline-none"
            onClick={close}
          >
            x
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {
          errorMessage !== undefined && (
            <p className="text-red-500">{errorMessage}</p>
          )
        }
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-black mb-2">Access</h2>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block mb-1">
              Quivr API Key:
            </label>
            <input
              type="text"
              id="apiKey"
              name="apiKey"
              value={settings.apiKey}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none"
            />
          </div>
        </section>

        {/* Brain Settings Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-black mb-2">Brain Settings</h2>
          <div className="mb-4">
            <label htmlFor="currentBrain" className="block mb-1">
              Current Brain:
            </label>
            <select
              id="currentBrainId"
              name="currentBrainId"
              value={settings.currentBrainId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none"
            >
              <option value="">Select a brain</option> 
              {brains.map((brain) => (
                <option key={brain.id} value={brain.id}>{brain.name}</option>
              ))}
            </select>
          </div>
          {isBrainSelected &&  (
            <button disabled={isDeleting} onClick={async () => {
              await deleteBrain(currentBrain.id) ;
              await saveSettings({ ...settings, currentBrainId: "" })
            }}
              className="px-2 py-1 font-bold text-white bg-red-400 rounded-lg focus:outline-none">
              { isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
          
          <div className="flex flex-row items-end">
            <div className="mr-4">

            <label htmlFor="brainName" className="block mb-1">
              Create New Brain:
            </label>
            <input
              type="text"
              id="brainName"
              name="brainName"
              value={newBrainName}
              onChange={(event) => setNewBrainName(event.target.value)}
              
              className="w-full px-3 py-2 border rounded focus:outline-none"
              />
              </div>
            {creatingNewBrain ? <p>Creating new brain... </p> : <button
              className="px-4 py-2 font-bold text-white bg-black rounded-lg focus:outline-none h-12"
              onClick={handleCreateNewBrain}
            >
              Create
            </button>}
          </div>
        </section>

        {/* Crawl Section */}
       {isBrainSelected &&  <section className="mb-6">
          <h2 className="text-xl font-semibold text-black mb-2">Crawl</h2>
          <div className="mb-4">

            <button
              className="px-3 py-2 font-bold text-white bg-black rounded focus:outline-none"
              onClick={() => void handleCrawlWebsite()}
              disabled={isCrawling}
              >
              {isCrawling ? "Crawling..." : "Crawl Website"}
            </button>
          </div>
        </section>}

        {/* Logo Settings Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-black mb-2">Logo Settings</h2>
          <label htmlFor="logoUrl" className="block mb-1">
            Logo URL:
          </label>
          <input
            type="text"
            id="logoUrl"
            name="logoUrl"
            value={settings.logoUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none mb-4"
          />
        </section>
      </div>
      <div className="flex items-end justify-end mt-4 space-x-4 border-t-2 border-[#f5f5f5] pt-2">
        <button
          className="px-4  py-2 font-bold text-white bg-black rounded-lg focus:outline-none"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};
