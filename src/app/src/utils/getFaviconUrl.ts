import { sendMessageAndWaitForResponse } from "./sendMessageAndWaitForResponse";


export const getFaviconUrl = async () => {
    try {
        return await sendMessageAndWaitForResponse({ type: 'getFaviconLink' });
    } catch (error) {
        console.error('Error getting favicon link:', error);
    }
};
