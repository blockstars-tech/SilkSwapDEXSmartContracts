import { types, task } from "hardhat/config";

task("runAndVerify", "Runs the given string and verifies it")
  .addParam("script", "Location of script")
  .addOptionalParam("autosaveaddr", "Automatically save the addresses", true, types.boolean)
  .setAction(async (taskArgs, hre) => {
    await hre.run("run", { script: "./taskScripts/removeFolder.ts" });
    await hre.run("run", { script: "./taskScripts/createFolder.ts" });
    await hre.run("run", { script: taskArgs.script });
    if (taskArgs.autosaveaddr) {
      await hre.run("run", { script: "./taskScripts/autoSaveAddresses.ts" });
    }
    await hre.run("run", { script: "./taskScripts/verify.ts" });
    await hre.run("run", { script: "./taskScripts/removeFolder.ts" });
  });
