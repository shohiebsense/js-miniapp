/**
 * Enum for supported SDK event types
 */
export enum MiniAppEvents {
  EXTERNAL_WEBVIEW_CLOSE = 'miniappwebviewclosed',
  PAUSE = 'miniapppause',
  RESUME = 'miniappresume',
  SECURE_STORAGE_READY = 'miniappsecurestorageready',
  SECURE_STORAGE_FAILED = 'miniappsecurestorageloaderror',
}

export enum MiniAppKeyboardEvents {
  KEYBOARDSHOWN = 'miniappkeyboardshown',
  KEYBOARDHIDDEN = 'miniappkeyboardhidden',
}
