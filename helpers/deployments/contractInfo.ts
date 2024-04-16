import { UpgradeType } from "./upgradeType";

export interface ISavedContractsInfo {
  upgradeType: UpgradeType;
  address: string;
  implementation?: string;
  proxyAdmin?: string;
}

export interface IUpgradeInfo {
  proxyAdmin: string;
  implementation: string;
}

export interface IContractInfo {
  name: string;
  address: string;
  constructorArgs: any[];
  upgradeType: UpgradeType;
  upgradeInfo?: IUpgradeInfo;
}
