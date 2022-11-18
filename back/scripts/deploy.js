// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const BatMon = await hre.ethers.getContractFactory("BatMon");
    const batmon = await BatMon.deploy();

    const ProgressNFT = await hre.ethers.getContractFactory("ProgressNFT");
    const progressNFT = await ProgressNFT.deploy();

    await delay(4000);

    await batmon.setProgressNFT(progressNFT.address);
    await progressNFT.setBatmon(batmon.address);

    // await delay(4000);

    console.log("Batmon deployed to:", batmon.address);
    console.log("ProgressNFT deployed to:", progressNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
