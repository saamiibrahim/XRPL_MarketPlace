

async function mintToken() {

    // console.log("Chal bhi");

    

    const net = "wss://xls20-sandbox.rippletest.net:51233";

      document.getElementById('result').innerHTML = "Connecting...";

    const client = new xrpl.Client(net);
    await client.connect();

  document.getElementById('result').innerHTML = "Connected to Network";


    // const firstAccount = xrpl.Wallet.fromSeed(standbySeedField.innerHTML)
    const getAccount = document.getElementById('account').value;
    
    const firstAccount = xrpl.Wallet.fromSeed(getAccount);
    const secondAccount = xrpl.Wallet.fromSeed("sh6V1iBKiUEF9e4NpF9uNF5wXLpj4");


    const tokenURL = document.getElementById('token_url').value;

    document.getElementById('result').innerHTML = "Minting NFT";

    const transactionBlob = {
        TransactionType: "NFTokenMint",
        Account: firstAccount.classicAddress,
        URI: xrpl.convertStringToHex(tokenURL),
        Flags: 8,
        TokenTaxon: 0

    }



    const Tx = await client.submitAndWait(transactionBlob, { wallet : firstAccount});
    
    const getNfts = await client.request({
        method: "account_nfts",
        account: firstAccount.classicAddress
    })



console.log(Tx);
console.log(Tx.result);
  results = '<br/> Successfully Minted Token';

  results = '<br/> <br/>  Account: ' + Tx.result.Account;

  
  results += '<br/> <br/>  Transaction Type : ' + Tx.result.TransactionType;

  results += '<br/> <br/>  Transaction Hash : ' + Tx.result.hash;

  results += '<br/> <br/>  Fee : ' + Tx.result.Fee;


//   results += '\n\n\nNFTS : ' + JSON.stringify(getNfts,null,2);
  
  balance = await client.getXrpBalance(firstAccount.classicAddress);

  document.getElementById('result').innerHTML = results;
  document.getElementById('balance').innerHTML = balance;

  client.disconnect();

}



async function getNFT() {


    
    const net = "wss://xls20-sandbox.rippletest.net:51233";

      document.getElementById('result').innerHTML = "Connecting...";

    const client = new xrpl.Client(net);
    await client.connect();


    document.getElementById('result').innerHTML = "Connected to Network";


    // const firstAccount = xrpl.Wallet.fromSeed(standbySeedField.innerHTML)
    const getAccount = document.getElementById('account').value;
    
    const firstAccount = xrpl.Wallet.fromSeed(getAccount);
    const secondAccount = xrpl.Wallet.fromSeed("sh6V1iBKiUEF9e4NpF9uNF5wXLpj4");

    document.getElementById('result').innerHTML = "Getting All NFTs";


    const getNfts = await client.request({
        method: "account_nfts",
        account: firstAccount.classicAddress
    })

 
//   results = '\n\n\nNFTS : ' + JSON.stringify(getNfts,null,2);
 
  results = '<br/><br/> Account : ' + getNfts.result.account;
  results += '<br/><br/>Account NFTs : ';

  for(nft of getNfts.result.account_nfts){

    results += '<br/>Token ID: ' + nft.NFTokenID;
    results += '<br/>Serial: ' + nft.nft_serial + '<br/><br/>';


  }



  balance = await client.getXrpBalance(firstAccount.classicAddress);

  document.getElementById('result').innerHTML = results;
  document.getElementById('balance').innerHTML = balance;

  client.disconnect();

}