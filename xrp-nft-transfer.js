async function createSellOffer(){

    
    
    const net = "wss://xls20-sandbox.rippletest.net:51233";

    document.getElementById('result').innerHTML = "Connecting...";

    const client = new xrpl.Client(net);
    await client.connect();

    document.getElementById('result').innerHTML = "Connected to Network";


    // const firstAccount = xrpl.Wallet.fromSeed(standbySeedField.innerHTML)
    const getAccount = document.getElementById('account').value;
    const Account = xrpl.Wallet.fromSeed(getAccount);

    const tokenid = document.getElementById('tokenid').value;
    const amount = document.getElementById('amount').value;

    document.getElementById('result').innerHTML = "Creating Sell Offer";
   


  const TransactionBlob = {
        "TransactionType" : "NFTokenCreateOffer",
        "Account": Account.classicAddress,
        "TokenID": tokenid,
        "Amount": amount,
        "Flags": 1
  }


    
  const tx = await client.submitAndWait(TransactionBlob, {wallet : Account});

console.log(tx);



let nftSellOffers;
try {
  nftSellOffers = await client.request({
method: "nft_sell_offers",
nft_id: tokenid  
})
} catch (err) {
  nftSellOffers = "No sell offers."
}


results = JSON.stringify(nftSellOffers,null,2)



  results += '<br/><br/>Transaction result:\n' + 
          JSON.stringify(tx.result.meta.TransactionResult, null, 2)

        results += '\n\nBalance changes:\n' + 
          JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2);

          balance = await client.getXrpBalance(Account.address);
          
          document.getElementById('balance').innerHTML = balance;
        
        
        document.getElementById('result').innerHTML = results
      

}



async function acceptSellOffer(){

    
    
  const net = "wss://xls20-sandbox.rippletest.net:51233";

  document.getElementById('result').innerHTML = "Connecting...";

  const client = new xrpl.Client(net);
  await client.connect();

  document.getElementById('result').innerHTML = "Connected to Network";


  // const firstAccount = xrpl.Wallet.fromSeed(standbySeedField.innerHTML)
  const getAccount = document.getElementById('account').value;
  const Account = xrpl.Wallet.fromSeed(getAccount);

  const tokenOfferId = document.getElementById('tokenofferid').value;
  // const amount = document.getElementById('amount').value;

  document.getElementById('result').innerHTML = "Accepting Sell Offer";
 


const TransactionBlob = {
  "TransactionType": "NFTokenAcceptOffer",
  "Account": Account.classicAddress,
  "SellOffer": tokenOfferId,
}


  
const tx = await client.submitAndWait(TransactionBlob, {wallet : Account});

console.log(tx);

results = JSON.stringify(tx.result,null,2);



// results += '<br/><br/>Transaction result:\n' + 
//         JSON.stringify(tx.result.meta.TransactionResult, null, 2)

//       results += '\n\nBalance changes:\n' + 
//         JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2);

        balance = await client.getXrpBalance(Account.address);
        
        document.getElementById('balance').innerHTML = balance;
      
      
      document.getElementById('result').innerHTML = results
    

}




async function getSellOffer(){

    
    const net = "wss://xls20-sandbox.rippletest.net:51233";

    document.getElementById('result').innerHTML = "Connecting...";

    const client = new xrpl.Client(net);
    await client.connect();

    document.getElementById('result').innerHTML = "Connected to Network";


    // const firstAccount = xrpl.Wallet.fromSeed(standbySeedField.innerHTML)
    const getAccount = document.getElementById('account').value;
    const Account = xrpl.Wallet.fromSeed(getAccount);
    
    document.getElementById('result').innerHTML = "Getting Sell Offers";


    const tokenid = document.getElementById('tokenid').value;

    results = '<b>Sell Offers</b>:  <br/><br/>';

    // let nftSellOffers
        //   try {
        //     nftSellOffers = await client.request({
        //       method: "nft_sell_offers",
        //       tokenid: standbyTokenIdField.value  
        //     })
        //   } catch (err) {
        //     nftSellOffers = 'No sell offers.'
        // }


    let nftSellOffers;

    try {
        nftSellOffers = await client.request({
            method: 'nft_sell_offers',
            nft_id: tokenid
        });
    } catch(err){
        nftSellOffers = 'No Sell Offers';
    }

    // results += JSON.stringify(nftSellOffers,null,2);


    // nftSellOffers

    results += '<br/><br/> <b>NFT ID</b> : ' + nftSellOffers.result.nft_id;
    
    for(offer of nftSellOffers.result.offers){

        results += '</br></br> <b>Owner</b>: ' + offer.owner;
        results += '</br><b>Amount:</b> ' + offer.amount;
        results += '</br><b>NFT Offer ID:</b> ' + offer.nft_offer_index;
    }

    document.getElementById('result').innerHTML = results;

    
    client.disconnect();

    
}