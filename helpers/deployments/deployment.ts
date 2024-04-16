import { BaseContract } from "ethers";
import { ethers, upgrades } from "hardhat";

import { UpgradeType } from "./upgradeType";
import { IContractInfo } from "./contractInfo";
import { getInfos, saveInfos } from "./infos";

export async function deployNewContract<T extends BaseContract>(
  contractName: string,
  upgradeType: UpgradeType,
  ...constructorArgs: any[]
): Promise<T> {
  return _deployNewContract<T>(contractName, upgradeType, undefined, ...constructorArgs);
}

export async function deployNewContractWithLib<T extends BaseContract>(
  contractName: string,
  upgradeType: UpgradeType,
  libraries: Record<string, string>,
  ...constructorArgs: any[]
): Promise<T> {
  return _deployNewContract<T>(contractName, upgradeType, libraries, ...constructorArgs);
}

const _deployNewContract = async <T extends BaseContract>(
  contractName: string,
  upgradeType: UpgradeType,
  libraries?: Record<string, string>,
  ...constructorArgs: any[]
) => {
  const Factory = await ethers.getContractFactory(contractName, { libraries });
  let contract: T;
  const contractInfo: IContractInfo = {
    name: contractName,
    address: "",
    constructorArgs: [],
    upgradeType,
    upgradeInfo: undefined,
  };

  switch (upgradeType) {
    case UpgradeType.NON_UPGRADEABLE:
      contract = (await Factory.deploy(...constructorArgs)) as T;
      await contract.waitForDeployment();
      contractInfo.address = await contract.getAddress();
      contractInfo.constructorArgs = constructorArgs;
      break;
    case UpgradeType.TRANSPARENT:
      contract = (await upgrades.deployProxy(Factory, constructorArgs)) as BaseContract as T;
      await contract.waitForDeployment();
      contractInfo.address = await contract.getAddress();
      contractInfo.upgradeInfo = {
        proxyAdmin: await upgrades.erc1967.getAdminAddress(contractInfo.address),
        implementation: await upgrades.erc1967.getImplementationAddress(contractInfo.address),
      };
      break;
    case UpgradeType.UUPS:
      throw new Error("UUPS is not supported yet");
    case UpgradeType.BEACON:
      throw new Error("BEACON is not supported yet");
  }
  const infos = getInfos();
  infos.push(contractInfo);
  saveInfos(infos);
  return contract;
};

export const upgradeContract = async <T extends BaseContract>(
  contractName: string,
  contractAddress: string,
  upgradeType: UpgradeType,
  useOpenzeppelin: boolean,
  libraries?: Record<string, string>
): Promise<T> => {
  const Factory = await ethers.getContractFactory(contractName, { libraries });
  let contract: T;
  const contractInfo: IContractInfo = {
    name: contractName,
    address: contractAddress,
    constructorArgs: [],
    upgradeType,
    upgradeInfo: undefined,
  };
  switch (upgradeType) {
    case UpgradeType.TRANSPARENT:
      if (useOpenzeppelin) {
        contract = (await upgrades.upgradeProxy(contractAddress, Factory)) as BaseContract as T;
        await contract.waitForDeployment();
        contractInfo.upgradeInfo = {
          proxyAdmin: await upgrades.erc1967.getAdminAddress(contractAddress),
          implementation: await upgrades.erc1967.getImplementationAddress(contractAddress),
        };
      } else {
        const proxyAdminAddr = await upgrades.erc1967.getAdminAddress(contractAddress);
        const proxyAdmin = await ethers.getContractAt("ProxyAdmin", proxyAdminAddr);
        const newImpl = await Factory.deploy();
        await newImpl.waitForDeployment();
        await proxyAdmin.upgrade(contractAddress, await newImpl.getAddress());
        contract = (await ethers.getContractAt(contractName, contractAddress)) as BaseContract as T;
        contractInfo.upgradeInfo = {
          proxyAdmin: await upgrades.erc1967.getAdminAddress(contractAddress),
          implementation: await upgrades.erc1967.getImplementationAddress(contractAddress),
        };
      }
      break;
    case UpgradeType.NON_UPGRADEABLE:
      throw new Error("Contract is not upgradeable");
    case UpgradeType.UUPS:
      throw new Error("UUPS is not supported yet");
    case UpgradeType.BEACON:
      throw new Error("BEACON is not supported yet");
  }

  const infos = getInfos();
  infos.push(contractInfo);
  saveInfos(infos);
  return contract;
};

export default {
  deployNewContract,
  deployNewContractWithLib,
  upgradeContract,
};
