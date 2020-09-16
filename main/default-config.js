const defaultConfig = {
  network: {
    port: 5050,
    peers: [
      '030d48ff6aec9f009d880cfe41ad9467c912e7c3190b003711c47aedc2c7ef1d20',
      '037da5c7c719428929a362469b7976e22ff58ad681b88cd62d4ee9c33b4bc8f6b7',
      '024f02bc23ce679b7b3c051123f091720d8fed6b89640b29fc8f43aba9cd568ead',
      '03e84374c1839734a8b144bbf3869068445c4486e8a44ced2476f0ef2f640ab693',
      '03fc46a0e8e6c4f12e78e95e0887c65712d4a616288ff35dea5d752b176427bc1e',
      '026c44c5fac6be1d56b98062b0091cc6e4fbb55e0706d4084070cb131aab7460ba',
      '02faac22bc72aaf83e80b2a0171885ae210eee166fb25ad4c2c00a1a73c6f17bc8',
      '02b630dcbd32363bc416a71569d2ff274763132439baba9967144019f4789ddf4a',
      '03c0a1413c1717095462b1331f34fdbe8255c2a9c221cbfd25a7f976fc4ac8bdcd',
      '02cd0b21e81f53b6ad013c9da5f224b19fedd6008041c3ea729ddc41780dd0e7ec',
      '02bda8db02eede288848149307a218c9a12ac1bafb3a3eaa72241c4594384ed184',
      '035b21aeaac164c9c23c27f39326dcd96eebb2b0f6ba7aa83bcc753d98cce14685',
      '0320ce10f639b0b7d4d3e314293bf8d030d51676fc57bd50df824961d8bfbb12e1',
      '039023337378d1045150692a9708d9e7d9e79e3c5141d3144752e82a91c74d9793',
      '029c9013b62761b09ddaa90aaaabe030d9cd3e969a9e14ac8600a1ce7a7890d9d7',
      '02bbef1ab4469fbb83022ef468fe3c16f501df1cfc43e8387245111c594d2379c3',
      '024089d6110dee1984baae6342865d01d3522f9794656c83d8a0d5f29bb3d49c15',
      '0339cac8cb61a527efdae499b249cb52adc480847839c2b6d4f04ad456bc223ded',
      '03250cc859db84bdfed37a22ce35587eed71208c137859d88a338098dcae70257e',
      '03ef3ac3572dfc9fdf70a74fdd88a8e8afc82cd0539c575dec36255f84a72ba05c',
      '027099de4f945ee62d61bc0b450a450a717c30062e8112b99c5382858041993efd',
      '023217356f56beb2263ee3a7f58fa03b15e3a3e15cf74235369fb2a02478db1af5',
    ],
    forceIPv6: false,
    maxPeers: 100,
    bootstrapAddress:
      'QmaAV3KD9vWhDfrWutZGXy8hMoVU2FtCMirPEPpUPHszAZ@95.217.215.141:41011',
  },
  genesis: {
    TPKEPublicKey:
      '0x0700000091ddeded6de547c4ca0a024f6fe49f3147e4bf2b95aa1756eb7b7df489871eb2cdb23f743598fc179fb554280def4a18',
    blockReward: '5.000000000000000000',
    basicGasPrice: '0.000000100000000000',
    balances: {
      '0x6bc32575acb8754886dc283c2c8ac54b1bd93195': '1000000',
      '0x3907a10fa08548d8959bb43c21c299d80dcb6761': '1000000',
      '0x4ec0127739b90ebb2e92a556bf10f3f163a1a186': '1000000',
      '0xbc2596a2c187720101a536845ed45b8a3fad59a0': '1000000',
      '0x3f2ad20f5e8ab2eaf2aee6fb879ebca08fcc9d6e': '1000000',
      '0x4e7f662d2b3f45d9d0bb3acc9c1c1a8bb4ed162e': '1000000',
      '0x601eca419f92883f260f220d511d874d84b58e69': '1000000',
      '0xb8fec3df7dbc19788af3e859c6d5c8c4c2afa84f': '1000000',
      '0x070b007953e6afa9d6ed1edd46d7aef4cf2753b2': '1000000',
      '0xe3eb3b22efeddd5e129546991db5e01e0aea95d1': '1000000',
      '0x6c64173a77fc5229245719a957c8977c6f6cc318': '1000000',
      '0x6ed88272e996f2becaa844065e105e37f5d4b140': '1000000',
      '0x639b097878ed334405acc8ec597ac917c7927fba': '1000000',
      '0xd01b0e7e3383c8e8e06d7fbf5cfd6d2546e97571': '1000000',
      '0x4c8e32fd4a46cf9a9113ec1e1220bb4ff187110b': '1000000',
      '0x8d93c712b9f64d4cf37318cba26eded4264e0043': '1000000',
      '0x60b396d2161b47f42cd40ad529efebfe29ce5fce': '1000000',
      '0x32c3b078c3462c4d3a315eae829cbca257513b89': '1000000',
      '0x7b21571cdd093900f8e9e778a3f57fb5864013a4': '1000000',
      '0x97ee48cb21af0844a575b389e9744e61edb56289': '1000000',
      '0x6b97166514403605e4a2ed403f14476bcdfc6c58': '1000000',
      '0x174a90329098e2e90346ecdaf08f04e58a7851a5': '1000000',
      '0xbe11ff83269be7983a5af8500a28d62303585674': '1000000',
    },
    validators: [
      {
        ECDSAPublicKey:
          '030d48ff6aec9f009d880cfe41ad9467c912e7c3190b003711c47aedc2c7ef1d20',
        thresholdSignaturePublicKey:
          '0xdc14174e0437142ac54dc24efe24b75fde6117bc49412fa1af6e7a1c73f58988d8b483446ac08a40bec30e6901892919',
      },
      {
        ECDSAPublicKey:
          '037da5c7c719428929a362469b7976e22ff58ad681b88cd62d4ee9c33b4bc8f6b7',
        thresholdSignaturePublicKey:
          '0x23ccd652c49ab682a5323d488d4b16a8abee7f459697ae3fe6c8a835af0a4381fef886ed34f4fc30cb7bf25783840a8e',
      },
      {
        ECDSAPublicKey:
          '024f02bc23ce679b7b3c051123f091720d8fed6b89640b29fc8f43aba9cd568ead',
        thresholdSignaturePublicKey:
          '0x2abc151ac2884932a11a8e0b875257540fa621b9a89f52e4325865bd5dc0ada7e573852d02d92ee0a2974084d5f9010d',
      },
      {
        ECDSAPublicKey:
          '03e84374c1839734a8b144bbf3869068445c4486e8a44ced2476f0ef2f640ab693',
        thresholdSignaturePublicKey:
          '0xaf5967950193e43a28d29359de11d41a2794025012c17f762a7bc675b3ac9a184fdb9b05aa2bb6efd2fb77d5b3071f16',
      },
      {
        ECDSAPublicKey:
          '03fc46a0e8e6c4f12e78e95e0887c65712d4a616288ff35dea5d752b176427bc1e',
        thresholdSignaturePublicKey:
          '0xd79f29f8760e1d5551f8c336cb909bf989188c8d049b39af971e0aea82cb5d36ea9621d9ff38bf64246f7b8df543b380',
      },
      {
        ECDSAPublicKey:
          '026c44c5fac6be1d56b98062b0091cc6e4fbb55e0706d4084070cb131aab7460ba',
        thresholdSignaturePublicKey:
          '0x16e34051a1b1c62193fc757eef7e6690a78b4ef3adc9da7440c630eee9ea5afd51d3b09eb0b92d9862d6c2c4b205be0c',
      },
      {
        ECDSAPublicKey:
          '02faac22bc72aaf83e80b2a0171885ae210eee166fb25ad4c2c00a1a73c6f17bc8',
        thresholdSignaturePublicKey:
          '0xfeb00c4d29dbfb9ff298b2fcf2359d9b11cf8b30c2f58493deedf26b2faeb89e2ef50ab060b5d6b4d4e44a5b15a5e318',
      },
      {
        ECDSAPublicKey:
          '02b630dcbd32363bc416a71569d2ff274763132439baba9967144019f4789ddf4a',
        thresholdSignaturePublicKey:
          '0xe91465685fead4782dd68cea2516dd178ec4fbe1db50aa63e1b6df28e6300a2fe39609c908c6e963acc3361393278b19',
      },
      {
        ECDSAPublicKey:
          '03c0a1413c1717095462b1331f34fdbe8255c2a9c221cbfd25a7f976fc4ac8bdcd',
        thresholdSignaturePublicKey:
          '0x3e6893b074edb0fef4338e43f1e311be9f20c831497581b12e3b445f512b03bbd1b08f2fe361f5a093c63b328ee83c10',
      },
      {
        ECDSAPublicKey:
          '02cd0b21e81f53b6ad013c9da5f224b19fedd6008041c3ea729ddc41780dd0e7ec',
        thresholdSignaturePublicKey:
          '0xbdec887c324dbd191d09e822e9d7f652a600a93e07e29384b58da028d505a3d93fc6d5cfb0415a1cccebf35d87da1b0d',
      },
      {
        ECDSAPublicKey:
          '02bda8db02eede288848149307a218c9a12ac1bafb3a3eaa72241c4594384ed184',
        thresholdSignaturePublicKey:
          '0xc1f2807044f70d83d2851786091db353d870c881c853bd92675993fd8d1fb8b136cd23e40d6bb9b01f23135f9f578c92',
      },
      {
        ECDSAPublicKey:
          '035b21aeaac164c9c23c27f39326dcd96eebb2b0f6ba7aa83bcc753d98cce14685',
        thresholdSignaturePublicKey:
          '0xf203ccb814dad4d79aeb322618bf75f45d9d3580796e12dd01652a411dffc7d10807395a1a8663424019242d3ac9d109',
      },
      {
        ECDSAPublicKey:
          '0320ce10f639b0b7d4d3e314293bf8d030d51676fc57bd50df824961d8bfbb12e1',
        thresholdSignaturePublicKey:
          '0xd11c5741edd7ad50f6ed7fe6acc29f788823046baf20b56f2b1e1c58774b86db9e1cc0a90c5073aa069453468cfb4a82',
      },
      {
        ECDSAPublicKey:
          '039023337378d1045150692a9708d9e7d9e79e3c5141d3144752e82a91c74d9793',
        thresholdSignaturePublicKey:
          '0xe00be24e4e34ad91045ca1979169109404b69fdf6651901f11c884cb596c5871460c2b4ba9229613049fc477323f0689',
      },
      {
        ECDSAPublicKey:
          '029c9013b62761b09ddaa90aaaabe030d9cd3e969a9e14ac8600a1ce7a7890d9d7',
        thresholdSignaturePublicKey:
          '0x85287190d578cb7cd690acced584c641278630999c3709ecf9692ef21e2a15ecc9a1ec8674d03699b80b7581abfdaa04',
      },
      {
        ECDSAPublicKey:
          '02bbef1ab4469fbb83022ef468fe3c16f501df1cfc43e8387245111c594d2379c3',
        thresholdSignaturePublicKey:
          '0x2030c7b002b8166c2ccc1690f1e20229e2dacb40b0b197bfe412b2923cf7b0fb49ba71987e27e60d1a50cfa0e890af11',
      },
      {
        ECDSAPublicKey:
          '024089d6110dee1984baae6342865d01d3522f9794656c83d8a0d5f29bb3d49c15',
        thresholdSignaturePublicKey:
          '0x3df09dfe200531ec72dd186ac6a292733a0d9d27141d18484ea7ab1eda221a134c7865ee8de994e19e7697a3af0cd50e',
      },
      {
        ECDSAPublicKey:
          '0339cac8cb61a527efdae499b249cb52adc480847839c2b6d4f04ad456bc223ded',
        thresholdSignaturePublicKey:
          '0x5283b63b7a57a71a899672c7ecbda98c9513d1d3801d7dcbec421c32cc9568b756b4393401ffd90e7bee80a91d4bf700',
      },
      {
        ECDSAPublicKey:
          '03250cc859db84bdfed37a22ce35587eed71208c137859d88a338098dcae70257e',
        thresholdSignaturePublicKey:
          '0x0c5c957ca7d4257cd4a0b0e252a95e62b6a15cb3532288c1a903304e5322e60d8e8a552f72c65ea302db809af18a7a98',
      },
      {
        ECDSAPublicKey:
          '03ef3ac3572dfc9fdf70a74fdd88a8e8afc82cd0539c575dec36255f84a72ba05c',
        thresholdSignaturePublicKey:
          '0x94681d3a1ab2110ceef6a24f19e4a0cec225c9d7830b127a155125b2098e2349cab030f8885a5c2db4281a313f61250b',
      },
      {
        ECDSAPublicKey:
          '027099de4f945ee62d61bc0b450a450a717c30062e8112b99c5382858041993efd',
        thresholdSignaturePublicKey:
          '0xf9385986873a6a0757525012fb22841cd9498f8a4d72c5e862b2fdfbdb43dbbed3e0038e47593d0cf224f9337874ab87',
      },
      {
        ECDSAPublicKey:
          '023217356f56beb2263ee3a7f58fa03b15e3a3e15cf74235369fb2a02478db1af5',
        thresholdSignaturePublicKey:
          '0x33317a84360881a342a780de5960e59d952470bafa5586c45c127258042f61c469e591c3cbd164b07b90ef191cae4312',
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
