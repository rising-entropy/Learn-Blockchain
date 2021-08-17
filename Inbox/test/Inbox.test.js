const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile.js');

const INITIAL_STRING = 'Hello There!';

let accounts;
let inbox;

beforeEach(async ()=>{
  accounts = await web3.eth.getAccounts();

  //contract is parsed, deployed and sent
  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: bytecode, arguments: [INITIAL_STRING]})
  .send({from: accounts[0], gas: '1000000'})

});

describe('Inbox', ()=>{
  it('deploys a contract', async ()=>{  
    // Check if contract is deployed successfully. Checking if address exists.
    assert.ok(inbox.options.address);
  });

  it('has a default message', async ()=>{
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, INITIAL_STRING);
  })

  it('can change the message', async ()=>{
    await inbox.methods.setMessage('General Kenobi').send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, 'General Kenobi');
  });

});