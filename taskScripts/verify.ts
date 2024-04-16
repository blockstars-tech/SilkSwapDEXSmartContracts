import { verifyDeployedContracts } from "./utils";

const main = async () => {
  await verifyDeployedContracts();
};

main()
  .then(() => {
    console.info("SuccessFully verified");
  })
  .catch((err) => {
    console.error("ERROR!!!");
    console.error(err);
  });
