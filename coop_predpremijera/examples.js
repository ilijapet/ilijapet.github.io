

// SIXT FUNCTION
const expectedBlockTime = 1000; 

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


function istina () {
    var done = 1;
    while (done != 10) {
        done += 1
        console.log(done)
        sleep(2000)
    }
    console.log('ilija care dal je moguce da se ovoliko mucish sa ovim?')
}

// async function depositFruits () {    
       
//         var done = await coopContract.methods.depositFruitsToCOOP(amount).send({from:web3.givenProvider.selectedAddress});    
//         console.log(done);   
//         while (done != true) { // Waiting expectedBlockTime until the transaction is mined            
//             await sleep(expectedBlockTime)
//           };
//         document.querySelector('#deposit_raspberry').innerText = 'You fruits is in COOP warhouse';      
//         console.log('5');
//     } else {
//         document.querySelector('#transfer_to_coop').innerText = 'Please become COOP member';
//     };
//   };

module.exports = { istina, expectedBlockTime, sleep }