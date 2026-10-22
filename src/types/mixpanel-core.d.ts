// The SDK's core loader exports the same instance, but its declaration only
// re-exports named types and omits the default export.
declare module 'mixpanel-browser/src/loaders/loader-module-core' {
  import mixpanel from 'mixpanel-browser';
  export default mixpanel;
}
