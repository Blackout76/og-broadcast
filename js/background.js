chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'broadcastData') {
      const data = request.data;
      console.log(data)
      // Authentification avec les identifiants d'API Google Sheets
      // Utilisez la bibliothèque gapi pour effectuer l'authentification et l'appel à l'API Google Sheets
  
      // Enregistrement des données dans un Google Sheet
      // Utilisez l'API Google Sheets pour effectuer la requête de création ou de mise à jour des données
    }
  });
