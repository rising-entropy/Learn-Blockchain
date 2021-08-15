const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

class Car{
  park(){
    return 'stopped';
  }

  drive(){
    return 'vrooom';
  }
}

let car;

beforeEach(()=>{
  car = new Car();
})

// 'Car' is label
describe('Car', ()=>{
  it('can park', ()=>{
    assert.strictEqual(car.park(), 'stopped');
  });

  it('can drive', ()=>{
    assert.strictEqual(car.drive(), 'vrooom');
  })
})