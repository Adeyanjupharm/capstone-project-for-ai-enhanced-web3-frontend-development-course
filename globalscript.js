// External JavaScript file for the global script
 
// Declare variables to track the total minted tokens and set a minting limit
let totalMintedTokens = 0;
const mintingLimit = 10000; // Set a limit for total tokens that can be minted
 
document.addEventListener('DOMContentLoaded', function() {
    const mintButton = document.querySelector('#mint button');
    const walletInput = document.querySelector('#walletAddress');
    const tokenInput = document.querySelector('#tokenAmount');
    const mintStatus = document.querySelector('#mintStatus'); // Access the mint status element
 
    mintButton.addEventListener('click', function() {
        let walletAddress = walletInput.value;
        let tokenAmount = parseInt(tokenInput.value);

        // Start the animation before processing
        mintStatus.classList.add('animate-status');
 
        // Validation for wallet address and token amount
        if(walletAddress !== '' && !isNaN(tokenAmount) && tokenAmount > 0) {
            // Call asynchronous function to simulate token minting
            simulateTokenMinting(tokenAmount)
                .then(minted => {
                    // Stop the animation and update the status
                    mintStatus.classList.remove('animate-status');
                    mintStatus.textContent = `Successfully minted ${minted} tokens to wallet: ${walletAddress}`;
                })
                .catch(error => {
                    // Stop the animation and show the error message
                    mintStatus.classList.remove('animate-status');
                    mintStatus.textContent = error;
                });
        } else {
            // Stop the animation if validation fails
            mintStatus.classList.remove('animate-status');
            mintStatus.textContent = 'Invalid wallet address or token amount. Please try again.';
        }
    });
});
 
// Asynchronous function to simulate token minting using a promise
function simulateTokenMinting(amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let successfullyMinted = 0;
            for(let i = 0; i < amount; i++) {
                if (totalMintedTokens < mintingLimit) {
                    totalMintedTokens++;
                    successfullyMinted++;
                } else {
                    reject('Minting limit reached. No more tokens can be minted.');
                    break;
                }
            }
            document.getElementById('totalMinted').textContent = `Total Minted: ${totalMintedTokens}`;
            resolve(successfullyMinted);
        }, 2000); // Simulate a network request delay
    });
}
 
 
// Function to fetch and display crypto prices
async function fetchCryptoPrices() {
    try {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,celestia&vs_currencies=usd';
        const response = await fetch(url);
        const data = await response.json();
         
        // Extract prices
        const bitcoinPrice = data.bitcoin.usd;
        const ethereumPrice = data.ethereum.usd;
        const solanaPrice = data.solana.usd;
        const celestiaPrice = data.celestia.usd
 
        // Update the DOM
        document.getElementById('cryptoPrices').innerHTML = `
            <h3>Crypto Prices:</h3>
            <p>Bitcoin Price: $${bitcoinPrice}</p>
            <p>Ethereum Price: $${ethereumPrice}</p>
            <p>Solana Price: $${solanaPrice}</p>
            <p>Celestia Price: $${celestiaPrice}</p>
        `; 
        document.getElementById("cryptoPrices").style.color = "blue"
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
}
 
// Call the function to fetch and display crypto prices
fetchCryptoPrices();