const { ethers } = require("ethers");
const readline = require("readline");
const fs = require("fs");

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }))
}

(async () => {
  const input = await askQuestion("Berapa banyak wallet yang ingin dibuat? ");
  const total = parseInt(input);

  if (isNaN(total) || total <= 0) {
    console.log("Input tidak valid. Masukkan angka lebih dari 0.");
    return;
  }

  let output = "=== Wallets Generated ===\n";

  for (let i = 0; i < total; i++) {
    const wallet = ethers.Wallet.createRandom();
    output += `\nWallet #${i + 1}\n`;
    output += `Address     : ${wallet.address}\n`;
    output += `Private Key : ${wallet.privateKey}\n`;
    output += `Mnemonic    : ${wallet.mnemonic.phrase}\n`;
  }

  const fileName = "wallets.txt";
  fs.writeFileSync(fileName, output);

  console.log(`\n✅ ${total} wallet berhasil dibuat dan disimpan di file: ${fileName}`);
})();
