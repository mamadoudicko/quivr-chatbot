
import axios, { AxiosError } from "axios";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { getCurrentWebsiteUrl } from "../utils/getCurrentWebsiteUrl";
import { useAxios } from "../utils/useAxios";

const roles = ["Viewer", "Editor", "Owner"] as const;
type BrainRoleType = (typeof roles)[number];

type MinimalBrainForUser = {
  id: UUID;
  name: string;
  rights: BrainRoleType;
};

export const useBrains = () => {
  const { axiosInstance } = useAxios();
const [isDeleting,setIsDeleting] = useState(false)


    const [fetchingBrains,setFetchingBrains] = useState(true)
    const [isCrawling,setIsCrawling] = useState(false)

    const [brains,setBrains] = useState<MinimalBrainForUser[]>([])
    const [errorMessage,setErrorMessage] = useState<string>() ;
    const fetchBrains = async () => {
        try {
            setFetchingBrains(true) ; 
            const { brains : userBrains } = (
                await axiosInstance.get<{ brains: MinimalBrainForUser[] }>("/brains/")
                ).data;
                setBrains(userBrains)
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.error(error);
                setErrorMessage(JSON.stringify(axiosError.message))
            }
        }
        finally {
            setFetchingBrains(false)
        }
    };

const getWebsiteNameWithoutExtension = (url:string) =>{
  const parsedUrl = new URL(url);
  let websiteName = parsedUrl.hostname.replace(/^www\./, "");

  const parts = websiteName.split(".");
  if (parts.length > 1) {
    parts.pop(); // Remove the last part (extension)
    websiteName = parts.join(".");
  }

  return websiteName;
}

const crawlCurrentWebsite = async (brainId: string, content: string) => {
  setIsCrawling(true);
  const currentWebsiteUrl = await getCurrentWebsiteUrl();

  const currentWebsiteName = getWebsiteNameWithoutExtension(currentWebsiteUrl)


  try {
    // Create a NamedFile instance with the specified content and filename
    const file = new File([content], `${currentWebsiteName}.txt` , { type: "text/plain" });
    const formData = new FormData();
    formData.append("uploadFile", file);
    await axiosInstance.post(`/upload?brain_id=${brainId}`, formData);
  } catch (error) {
    console.error(error);
  } finally {
    setIsCrawling(false);
  }
};




const deleteBrain = async (brainId:string) => {
  try {
    setIsDeleting(true)
    await axiosInstance.delete(`/brains/${brainId}/subscription`);
   
  }
  catch (error) {
    console.error(error);
  }
  finally {
    setIsDeleting(false)
  }
}

 const createBrain = async (
    name: string
): Promise<MinimalBrainForUser> => {
  return (
    (await axiosInstance.post(`/brains/`, {
        name
    }))
      .data
  );
};



  useEffect(()=> {
    void fetchBrains();

  },[])

  return {
    brains,
    createBrain,
    fetchBrains,
    fetchingBrains,
    crawlCurrentWebsite,
    isCrawling,
    errorMessage,
    deleteBrain,
    isDeleting

  }

}