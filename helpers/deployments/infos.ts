import fs from "fs";
import { IContractInfo } from "./contractInfo";

import configs from "../../configs/configs.json";

export const getInfos = (): IContractInfo[] => {
  const { dir, jsonPath } = getLocations();

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return [];
  }

  if (!fs.existsSync(jsonPath)) {
    return [];
  }
  return JSON.parse(String(fs.readFileSync(jsonPath)));
};

export const saveInfos = (infos: IContractInfo[]) => {
  const { jsonPath } = getLocations();
  fs.writeFileSync(jsonPath, JSON.stringify(infos));
};

export const getLocations = () => {
  const dir = `./${configs.tempFolderName}`;
  const jsonPath = `${dir}/${configs.infoFile}`;
  return { dir, jsonPath };
};
