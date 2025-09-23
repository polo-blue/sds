import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    // eslint-disable-next-line no-undef
    console.log('SW registered: ', swScriptUrl);
  },
  onOfflineReady() {
    // eslint-disable-next-line no-undef
    console.log('PWA application ready to work offline');
  },
});
