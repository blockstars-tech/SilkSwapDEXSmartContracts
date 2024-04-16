import fs from "fs";
import { network } from "hardhat";

import { IContractInfo } from "../helpers/deployments/contractInfo";
import { getInfos, getLocations, saveInfos } from "../helpers/deployments/infos";
import { UpgradeType } from "../helpers/deployments/upgradeType";
import { _saveAddresses, verifyContract } from "../helpers/utils";

export const verifyDeployedContracts = async () => {
  if (network.name === "hardhat") {
    return;
  }
  const infos = getInfos();
  for (const contract of infos) {
    switch (contract.upgradeType) {
      case UpgradeType.NON_UPGRADEABLE:
        await verifyContract(contract.address, contract.constructorArgs);
        break;
      case UpgradeType.TRANSPARENT:
        await verifyContract(
          contract.upgradeInfo?.implementation as string,
          contract.constructorArgs
        );
        break;
      case UpgradeType.UUPS:
        throw new Error("UUPS is not supported yet");
      case UpgradeType.BEACON:
        throw new Error("BEACON is not supported yet");
    }
  }
  console.info("All contracts were verified");
};

export const saveDeployedAddresses = () => {
  const addresses: Record<string, object> = {};
  const contractNames: Record<string, number> = {};
  const infos = getInfos();
  for (const contract of infos) {
    let contractName: string;
    if (contractNames[contract.name] === undefined) {
      contractNames[contract.name] = 1;
      contractName = contract.name;
    } else {
      contractNames[contract.name]++;
      contractName = contract.name + `__${contractNames[contract.name]}`;
    }
    switch (contract.upgradeType) {
      case UpgradeType.NON_UPGRADEABLE:
        addresses[contractName] = {
          upgradeType: contract.upgradeType,
          address: contract.address,
        };
        break;
      case UpgradeType.TRANSPARENT:
        addresses[contractName] = {
          upgradeType: contract.upgradeType,
          address: contract.address,
          implementation: contract.upgradeInfo?.implementation,
          proxyAdmin: contract.upgradeInfo?.proxyAdmin,
        };
        break;
      case UpgradeType.UUPS:
        throw new Error("UUPS is not supported yet");
      case UpgradeType.BEACON:
        throw new Error("BEACON is not supported yet");
    }
  }
  _saveAddresses(addresses, true, true);
};

export const removeFolder = () => {
  const { dir } = getLocations();
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  console.info(`${dir} folder was removed`);
};

export const createFolderAndFile = () => {
  const { dir } = getLocations();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  console.info(`${dir} folder was created`);
  const emptyJson: IContractInfo[] = [];
  saveInfos(emptyJson);
};

export default {
  verifyDeployedContracts,
  removeFolder,
  createFolderAndFile,
};
