const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile.js')

const provider = new HDWalletProvider(
  'enlist century someone profit eight gold glow hockey castle report faith strategy',
  'https://rinkeby.infura.io/v3/dbd7d4a2980a4e3891ebe10900f40b3c'
)

const web3 = new Web3(provider);

const deploy = async () => {

  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account: ', accounts[0]);

  let result;
  try{
    result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hello There!']})
    //.estimateGas()
    .send({gas: '1000000', from: accounts[0]})
  }
  catch(err)
  {
    console.log(err)
  }
  console.log(result)
  //console.log('Deployed to: ', result.options.address);
}
deploy();