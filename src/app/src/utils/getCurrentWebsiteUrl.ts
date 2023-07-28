import { sendMessageAndWaitForResponse } from "./sendMessageAndWaitForResponse";

export const getCurrentWebsiteUrl = async () => {
    return sendMessageAndWaitForResponse({ type: 'getUrl' });
}