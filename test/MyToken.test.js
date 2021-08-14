

const Token = artifacts.require('MyToken')
const { assert } = require('chai')
const chai = require('chai')
const BN = web3.utils.BN
const chainBN = require('chai-bn')(BN)
chai.use(chainBN)
const chaiAsPromise = require('chai-as-promised')
chai.use(chaiAsPromise)

const expect = chai.expect



contract("Token Test", (accounts)=>{

    const [deployerAcc, recipient, anotherAcc] = accounts

    it("all tokens should be in my acc", async()=>{
        let instance = await Token.deployed()
        // console.log("IIIIIIIIIII", instance)
        let totalSupply = await instance.totalSupply()
        let balance = await instance.balanceOf(deployerAcc)
        expect(await instance.balanceOf(deployerAcc)).to.be.a.bignumber.equal(totalSupply)
    })
    it("send tokens bw acc's", async()=>{
        const sendTokens = 1
        let instance = await Token.deployed()
        let totalSupply = await instance.totalSupply()
        expect(instance.balanceOf(deployerAcc)).to.eventually.be.a.bignumber.equal(totalSupply)
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens))
    })
})