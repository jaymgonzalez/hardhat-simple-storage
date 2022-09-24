import { ethers } from 'hardhat'
import { SimpleStorage } from '../typechain-types'
import { assert, expect } from 'chai'

describe('SimpleStorage', function () {
  let simpleStorageFactory, simpleStorage: SimpleStorage
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
    simpleStorage = await simpleStorageFactory.deploy()
  })
  it('Should start with a fav number of 0', async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = '0'

    assert.equal(currentValue.toString(), expectedValue)
  })
  it('Should update when we call update', async function () {
    const expectedValue = '5'
    const txResponse = await simpleStorage.store(expectedValue)
    await txResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()

    assert.equal(currentValue.toString(), expectedValue)
  })
})
