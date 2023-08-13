import * as dotenv from 'dotenv'

import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
// import '@openzeppelin/hardhat-upgrades'
import { emitWarning } from 'process'

dotenv.config()

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : undefined
const requiredKeys = ['PRIVATE_KEY', 'INFURA_API_KEY', 'ETHERSCAN_API_KEY', 'CMC_API_KEY']

requiredKeys.forEach(key => {
  if (process.env[key] === undefined) emitWarning(`${key} is not set`)
})

const config: HardhatUserConfig = {
  //   solidity: "0.8.19",
  solidity: {
    compilers: [
      {
        version: '0.8.9',
      },
      {
        version: '0.8.19',
        // settings: {
        //     optimizer: {
        //         enabled: true,
        //         runs: 800,
        //         details: { yul: false },
        //     },
        // },
      },
    ],
  },

  networks: {
    // hardhat: {
    //   forking: {
    //     url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //     blockNumber: 15403550,
    //     enabled: true,
    //   },
    // },

    baseGoerli: {
      url: `https://1rpc.io/base-goerli	`,
      chainId: 84531,
      accounts,
      gasPrice: 1000000000 * 2,
      blockGasLimit: 0x1fffffffffffff,
      gasMultiplier: 10,
    },

    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 5,
      accounts,
    },

    optimism: {
      url: 'https://mainnet.optimism.io',
      chainId: 10,
      accounts,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    coinmarketcap: process.env.CMC_API_KEY,
    currency: 'EUR',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'types',
  },
}

export default config