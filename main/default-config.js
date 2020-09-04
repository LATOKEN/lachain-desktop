const defaultConfig = {
  network: {
    address: '0.0.0.0',
    port: 5050,
    peers: [
      'tcp://0241049d03290c23a129716d6a9bd3e260c5c9457c4ae2c85c3776e916b8f4257f@116.203.75.72:5050',
      'tcp://03d772683b74fa25308b23cb92b02f78baf3e265d6fb58f1ed519db0083b523ef9@95.217.6.171:5050',
      'tcp://02083a873fd52fdf925961ca1140a251e05fb30e9511613ef2037c3acf98f1d0c1@88.99.190.191:5050',
      'tcp://021f33641a68fdb7a630eac72be37c77a560b161109e240e56a561e8bffa1b8c22@94.130.78.183:5050',
      'tcp://026148df2ac17ffcf0d1f75576044dbf3deb87e4cc862f8d4a050f4c4e5859faf1@94.130.24.163:5050',
      'tcp://03f281261651c0ac44bc0c452d09fa74cf21bd6fdcc845f33e475531a183148767@94.130.110.127:5050',
      'tcp://02447f2307bbf402d8932e80ce82603e8a2b7d9110d71f9aa4b34c71df0edec24e@94.130.110.95:5050',
      'tcp://021a0aa7dac899b5532640d2ea51ca27d445112fad592ba6d042d3034e7b975878@94.130.58.63:5050',
      'tcp://02bd67bee2b0a03ace1b34396a83ef9c43a968ea7bb2211eb668e6f06a4d8b6c12@88.99.86.166:5050',
      'tcp://03a4392c5b3cfd92d6f5d523a3d0c5520fdb8685d0716833bc561072b9034580db@88.198.78.106:5050',
      'tcp://0244f32d389031fd248a4f5d51b6f5ed370444556c820ab83033d8be5d051e5cbf@88.198.78.141:5050',
      'tcp://039276350990e367acde88ad364364f41ee85dbef972026f9341e87176efdc1129@88.99.126.144:5050',
      'tcp://03c46fc2095f393fc614e5de8ac51ef6bbf6d0a5314c363a26e734ef5c838d1660@88.99.87.58:5050',
      'tcp://02b280cf5d4066e9f50a2264fecbf21dfc75738c4ca1b023feb7dfe3853069f4e8@95.217.6.234:5050',
      'tcp://03ebcb1cf9a416b640005337092ce3c770d8fa590f4654dad26f97fed307371063@95.217.12.226:5050',
      'tcp://0349c05a9c78175d5237e577b729721eef2bb79a214e17e88bb514f7a86c04099c@95.217.14.117:5050',
      'tcp://0298bee335a4cf3773c9dab29b3def2907a79a69037cf8a1df6a72183b16c5747e@95.217.17.248:5050',
      'tcp://035f99c6f5192aa6453eec7f9b3797978e2235d291d98b931a31c434c764bc4f47@95.217.12.230:5050',
    ],
    forceIPv6: false,
    maxPeers: 100,
  },
  genesis: {
    TPKEPublicKey:
      '0x050000005eb99714f6e6579b245ee70923f9c1d9d91c8ced21edf76bd8159d87dc2329586dfdddc7141dab81b42b14e5b060060d',
    blockReward: '5.000000000000000000',
    basicGasPrice: '0.000000100000000000',
    balances: {
      '0x6bc32575acb8754886dc283c2c8ac54b1bd93195': '1000000',
      '0x966af90132a48cd854a62d145b47e55b836a3df2': '1000000',
      '0x334afed6d27c2c003629d6d6e24d5ce4d663d012': '1000000',
      '0x390d687688f6c168daa38f7b0fc2ac9d073a32fc': '1000000',
      '0xca0175350df0beda0b6277d51afd9b2ca19f1152': '1000000',
      '0x164964d1bf83f211827f407baea699f34498a04b': '1000000',
      '0x40058880bfddd59735e77031f4b8807925280dc2': '1000000',
      '0x8d0fbd656920c70fdcdeffd22071375245a780d1': '1000000',
      '0x9ec177bcaf621ab10423ecc7741c4ca5ed8b8266': '1000000',
      '0xfb78c5328d1cece19491617050c26b9b8f667355': '1000000',
      '0x9e2aa980f652bab1ea141ab827870f1486db3cb9': '1000000',
      '0xbb256d0b1bcd88ec7a0021380975566593a79c71': '1000000',
      '0x94bfbe2bf889ea35734a3441a17cab990cc1e4a7': '1000000',
      '0x9443f1f621abeadaf64f42eb6c067d87532303ee': '1000000',
      '0xb8780a5019c9567e866fa98ef79dc0fb4a40c81a': '1000000',
      '0xd1024ddde6419267543949f8fc521bf06c797de0': '1000000',
      '0xbb3a88a0af43c9e30419efc8c879b710e0e1d30e': '1000000',
      '0x9c8ead424167e3419ef47876909447290077d80b': '1000000',
      '0x2392e11d20fdd3a1b264ecd1426abd1621b3fbab': '1000000',
    },
    validators: [
      {
        ECDSAPublicKey:
          '0241049d03290c23a129716d6a9bd3e260c5c9457c4ae2c85c3776e916b8f4257f',
        thresholdSignaturePublicKey:
          '0x3da507728eaed35392a21bb4d11cc9f64c30682badd836b991f025dedef87f68862b76574a09e61fbf5d5eeadf728717',
      },
      {
        ECDSAPublicKey:
          '03d772683b74fa25308b23cb92b02f78baf3e265d6fb58f1ed519db0083b523ef9',
        thresholdSignaturePublicKey:
          '0x4a7b41c7ac287a0d6bb121cd2b2304f5671aa49cb0417868e285f03f86915c0b4eb5940835cde7de7f2f276de98b0d95',
      },
      {
        ECDSAPublicKey:
          '02083a873fd52fdf925961ca1140a251e05fb30e9511613ef2037c3acf98f1d0c1',
        thresholdSignaturePublicKey:
          '0xbcbbc2996ad9522e55c64820e1426146b32753ff4949ff8d84880223562c2267f27519d409aca8905028055a39800606',
      },
      {
        ECDSAPublicKey:
          '021f33641a68fdb7a630eac72be37c77a560b161109e240e56a561e8bffa1b8c22',
        thresholdSignaturePublicKey:
          '0xbdd8201588523bf40756101a4fefa561ec67e952e2883ea93621e3a410e49407ec629fcb3b75e6208d2a181a1f5e0414',
      },
      {
        ECDSAPublicKey:
          '026148df2ac17ffcf0d1f75576044dbf3deb87e4cc862f8d4a050f4c4e5859faf1',
        thresholdSignaturePublicKey:
          '0xc7d553ed32111234095051792220316c862f52423a4a606931efe06ca7d0a02b9090f9f17708fe3bb9e2992d31abdb0d',
      },
      {
        ECDSAPublicKey:
          '03f281261651c0ac44bc0c452d09fa74cf21bd6fdcc845f33e475531a183148767',
        thresholdSignaturePublicKey:
          '0x5a51235b7f5378e49d145c3cbc4746c510419a3ac15cbb696dcd0a98b3ca5086062f41b55f8df5c62508fe9ec270dc15',
      },
      {
        ECDSAPublicKey:
          '02447f2307bbf402d8932e80ce82603e8a2b7d9110d71f9aa4b34c71df0edec24e',
        thresholdSignaturePublicKey:
          '0xb95ae13fc744f4f946db77e3d41c88fa98810456d843e6ce3221f683385c76761b4a57a1170fddbb63740d4bca98f200',
      },
      {
        ECDSAPublicKey:
          '021a0aa7dac899b5532640d2ea51ca27d445112fad592ba6d042d3034e7b975878',
        thresholdSignaturePublicKey:
          '0x059f72c2181f6e22a942f33514ced03b4cf717f1b90a8df547c6193c5cc347a56105aa2486016b463be11754faf54b90',
      },
      {
        ECDSAPublicKey:
          '02bd67bee2b0a03ace1b34396a83ef9c43a968ea7bb2211eb668e6f06a4d8b6c12',
        thresholdSignaturePublicKey:
          '0xa81f2346f998a636532a5629b55f1f5e3e342ba988e957cbb8a2954c0fb2ef2db86a432723e83cb356a1bef36448d887',
      },
      {
        ECDSAPublicKey:
          '03a4392c5b3cfd92d6f5d523a3d0c5520fdb8685d0716833bc561072b9034580db',
        thresholdSignaturePublicKey:
          '0x07b88531bf6a399fc7b897df436e2cec5f1fc10c1c5d66c07180c628d663f2c33dad71db53044a1957f13401aa489317',
      },
      {
        ECDSAPublicKey:
          '0244f32d389031fd248a4f5d51b6f5ed370444556c820ab83033d8be5d051e5cbf',
        thresholdSignaturePublicKey:
          '0x46bd2383e0cbf97223ccb75da3454f962fa18a8e2072c2773aafaba1b4589478abb6624c76105f77b9828e401f301e00',
      },
      {
        ECDSAPublicKey:
          '039276350990e367acde88ad364364f41ee85dbef972026f9341e87176efdc1129',
        thresholdSignaturePublicKey:
          '0x164122fcc162ede66da0cc65476fc9a11a2fe30fb69fb0acf1659f71fa192cda40e91fc6d6adeb9f5a510f9e52cb020a',
      },
      {
        ECDSAPublicKey:
          '03c46fc2095f393fc614e5de8ac51ef6bbf6d0a5314c363a26e734ef5c838d1660',
        thresholdSignaturePublicKey:
          '0x0a29077119889bc2c9b72f2cb49fb630594453b0b1f7afb94662446e268396efd3aa6bb67b559baceda5faba64521684',
      },
      {
        ECDSAPublicKey:
          '02b280cf5d4066e9f50a2264fecbf21dfc75738c4ca1b023feb7dfe3853069f4e8',
        thresholdSignaturePublicKey:
          '0xe92777c5f1cd58376ea3950ab1f0930c6c89d274c5d87ef1a1a2f1b21d97762383150aa13df6286c7f6db76800732e16',
      },
      {
        ECDSAPublicKey:
          '03ebcb1cf9a416b640005337092ce3c770d8fa590f4654dad26f97fed307371063',
        thresholdSignaturePublicKey:
          '0x844056a142c4ec4d37ab4b711aea01605bd1722eb4aa0eb1e37a967f04a6e67355f66862a11867b76cc87432dbac8e11',
      },
      {
        ECDSAPublicKey:
          '0349c05a9c78175d5237e577b729721eef2bb79a214e17e88bb514f7a86c04099c',
        thresholdSignaturePublicKey:
          '0xb478006cf2c1c15b396f6a8ec63b474858bde39aa2e500fe827fa44da39a8fd70d3c12ffe5a4ea830f99616ded547204',
      },
      {
        ECDSAPublicKey:
          '0298bee335a4cf3773c9dab29b3def2907a79a69037cf8a1df6a72183b16c5747e',
        thresholdSignaturePublicKey:
          '0x0619c12b2ce96471d9908f9f0120a2e88f4fc78515887d23bf72dfb97d0bdd86b7a77a727d2cd1cefaa91be245599608',
      },
      {
        ECDSAPublicKey:
          '035f99c6f5192aa6453eec7f9b3797978e2235d291d98b931a31c434c764bc4f47',
        thresholdSignaturePublicKey:
          '0x43b3143d60b9b1c535aa89356768350b5a57b379a51e94c89c9d2bdf91a902b561cb85918cf65be3740b02e33c7dda87',
      },
    ],
  },
  rpc: {
    hosts: ['+'],
    port: 7070,
    apiKey: 'asdasdasd',
  },
  vault: {
    path: 'wallet.json',
    password: '12345',
  },
  storage: {
    provider: 'RocksDB',
    path: 'ChainLachain',
  },
  blockchain: {
    targetBlockTime: 5000,
  },
}

module.exports = {
  defaultConfig,
}
