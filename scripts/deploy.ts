import { ethers } from "hardhat";
import { deployNewContract } from "../helpers/deployments/deployment";
import { UpgradeType } from "../helpers/deployments/upgradeType";
import { UniswapV2Factory, UniswapV2Router02 } from "../typechain-types";

if (!process.env.WETH) {
  throw new Error("WETH address is not provided in .env file");
}

const main = async () => {
  const signers = await ethers.getSigners();
  console.log(signers[0].address);
  const factory = await deployNewContract<UniswapV2Factory>(
    "UniswapV2Factory",
    UpgradeType.NON_UPGRADEABLE,
    signers[0].address
  );
  const router = await deployNewContract<UniswapV2Router02>(
    "UniswapV2Router02",
    UpgradeType.NON_UPGRADEABLE,
    await factory.getAddress(),
    process.env.WETH
  );

  console.log("factory ->", await factory.getAddress());
  console.log("router  ->", await router.getAddress());
};

main();
