import "dotenv/config";

const pks: string[] = [];

if (process.env.DEPLOYER_PK) {
  pks.push(process.env.DEPLOYER_PK);
}
if (process.env.PK_1) {
  pks.push(process.env.PK_1);
}
if (process.env.PK_2) {
  pks.push(process.env.PK_2);
}

export default pks;
