window.watsonAssistantChatOptions = {
  integrationID: "3191969d-e113-4739-9935-99f6e447374c", // The ID of this integration.
  region: "us-south", // The region your integration is hosted in.
  serviceInstanceID: "25838a59-6dbd-4b78-a9b9-0166b910e999", // The ID of your service instance.
  onLoad: async (instance) => { await instance.render(); }
};
setTimeout(function(){
  const t=document.createElement('script');
  t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
  document.head.appendChild(t);
});