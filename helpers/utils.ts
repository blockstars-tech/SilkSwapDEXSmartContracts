import fs from "fs";
import hre, { ethers, network } from "hardhat";

import configs from "../configs/configs.json";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const verifyContract = async (contractAddress: string, constructorArguments: Array<any>) => {
  await sleep(16000);
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments,
    });
  } catch (error) {
    console.error("error is ->");
    console.error(error);
    console.error("cannot verify contract", contractAddress);
  }
};

export const impersonateAccount = async (address: string) => {
  return hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });
};

export const _saveAddresses = (
  addresses: Record<string, string | object>,
  useAutoSavePath: boolean,
  append: boolean
) => {
  const specialFolder = process.env.SPECIAL_FOLDER;
  const specialName = process.env.SPECIAL_NAME;
  let dir = `./${configs.addressesLocation}/${network.name}/`;
  if (useAutoSavePath) {
    dir = `./${configs.addressesLocation}/autosave/${network.name}/`;
  }
  let jsonPath = dir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (specialFolder) {
    const folderPath = `${dir}${specialFolder}/`;
    jsonPath = folderPath;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }
  if (specialName) {
    jsonPath += `${specialName}`;
  }
  jsonPath += "Addresses.json";

  let newAddresses = {};

  if (fs.existsSync(jsonPath) && append) {
    const existingAddresses = JSON.parse(String(fs.readFileSync(jsonPath)));
    newAddresses = { ...existingAddresses, ...addresses };
  } else {
    newAddresses = { ...addresses };
  }

  fs.writeFileSync(jsonPath, JSON.stringify(newAddresses));
};

export const saveAddresses = (addresses: Record<string, string | object>, append = false) => {
  _saveAddresses(addresses, false, append);
};

export const readAddresses = (useAutoSavePath: boolean): Record<string, any> => {
  const specialFolder = process.env.SPECIAL_FOLDER;
  const specialName = process.env.SPECIAL_NAME;
  let dir = `./${configs.addressesLocation}/${network.name}/`;
  if (useAutoSavePath) {
    dir = `./${configs.addressesLocation}/autosave/${network.name}/`;
  }
  let jsonPath = dir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (specialFolder) {
    const folderPath = `${dir}${specialFolder}/`;
    jsonPath = folderPath;
  }
  if (specialName) {
    jsonPath += `${specialName}`;
  }
  jsonPath += "Addresses.json";

  if (!fs.existsSync(jsonPath)) {
    throw new Error("Wrong path");
  }

  return JSON.parse(String(fs.readFileSync(jsonPath)));
};

export const advanceTime = async (seconds: number) => {
  await network.provider.send("evm_increaseTime", [seconds]);
  await network.provider.send("evm_mine");
};

export const advanceBlock = async (blockCount: number) => {
  for (let i = 0; i < blockCount; i++) {
    await network.provider.send("evm_mine");
  }
};

export const advanceBlockAndTime = async (blockCount: number, seconds: number) => {
  const secondPerBlock = Math.floor(seconds / blockCount);
  for (let i = 0; i < blockCount; i++) {
    await advanceTime(secondPerBlock);
  }
};

export const setTimestamp = async (seconds: number) => {
  await network.provider.send("evm_setNextBlockTimestamp", [seconds]);
  await network.provider.send("evm_mine");
};

export const getTimestamp = async (): Promise<bigint> => {
  const blockNumber = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNumber);
  return block ? BigInt(block.timestamp) : -1n;
};

export const daysToSeconds = (days: bigint): bigint => {
  return hoursToSeconds(days * 24n);
};

export const hoursToSeconds = (hours: bigint): bigint => {
  return minutesToSeconds(hours * 60n);
};

export const minutesToSeconds = (minutes: bigint): bigint => {
  return minutes * 60n;
};

export const getNextTimestampDivisibleBy = async (num: bigint): Promise<bigint> => {
  const blockTimestamp = await getTimestamp();
  const numCount = blockTimestamp / num;
  return numCount + 1n * num;
};

export default {
  sleep,
  verifyContract,
  impersonateAccount,
  saveAddresses,
  readAddresses,
  advanceTime,
  advanceBlock,
  advanceBlockAndTime,
  setTimestamp,
  getTimestamp,
  daysToSeconds,
  hoursToSeconds,
  minutesToSeconds,
  getNextTimestampDivisibleBy,
};
