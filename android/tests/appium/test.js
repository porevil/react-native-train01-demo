const wd = require("wd");

const opts = {
    port: 4723,
    capabilities: {
      platformName: "Android",
    //   platformVersion: "8.0",
      deviceName: "Android Emulator",
      app: "/Users/tnl/Workspace/alpha-mobile-platform/android/app/build/outputs/apk/debug/app-debug.apk",
      automationName: "UiAutomator2"
    }
};
  
const driver = wd.remote(opts);

// const btn = await driver.
