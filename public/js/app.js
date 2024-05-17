if ('serviceWorker' in navigator) {
    // Register service worker
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service worker registered:', registration);
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  
    // Listen for service worker updates
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service worker updated, reloading page...');
      window.location.reload();
    });
  
    // Listen for service worker state changes
    navigator.serviceWorker.addEventListener('statechange', () => {
      console.log('Service worker state:', navigator.serviceWorker.controller.state);
    });
  } else {
    console.warn('Service worker is not supported in this browser.');
}
  