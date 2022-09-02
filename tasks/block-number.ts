// Get the block number of whichever blockchain we are working with
import { task } from 'hardhat/config'

task('block-number', 'Prints the current block number').setAction(
  async (taskArg, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current block number: ${blockNumber}`)
  }
)
