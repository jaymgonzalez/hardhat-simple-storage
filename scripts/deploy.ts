import { ethers, run, network } from 'hardhat'

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying SimpleStorage contract...')

  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    // we want to wait to get the blockchain in sync before verifying
    console.log('Waiting for block txes...')
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }
  console.log('Simple Storage deployed to:', simpleStorage.address)
}

async function verify(contractAddress: string, args: any[]) {
  console.log('Verifying contract...')
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (err: any) {
    if (err.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!')
    } else {
      console.log(err)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
