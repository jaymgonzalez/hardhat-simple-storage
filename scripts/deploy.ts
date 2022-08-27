import { ethers } from 'hardhat'

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying SimpleStorage contract...')
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log('Simple Storage deployed to:', simpleStorage.address)
}

main()
  .then(() => process.exit(1))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
