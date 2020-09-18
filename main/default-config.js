const defaultConfig = {
  network: {
    port: 5050,
    peers: [
      '023a29bff500b9b2e5a0f02328883f4e03225219cecacbceddc1cb9195fe8036d7',
      '03d7745471ddabae4ce8ba8abc85d50fc157b9552f4205861917ad77052c54740b',
      '02523a7c809a1eadbf371fd8e670db01f15256c6db861bfb6a2c7777408aa21dcc',
      '025e8992a2395c7d7323044b1c52d0b4f58cb77f7c1a0af8342f19ce3913753a19',
      '03fef56b72f43d18415b33e970fd7cbcfaf9b9a6104342d790fe57df2940094dff',
      '030db98f74180b65078a8fd90da8d700e2099afd79d360fdcc8fcb68d4f47f4be4',
      '02fcced63a9226447ea8e188a29b265631312b67996a7cd400331edae2df7af3c3',
      '037e1228fbdc69c46cf8d5b03cee6f6e56230d32fb6bfcbe2ff9858947b584350b',
      '02eb23f1b9ff457fa8ce2819a230757ea4f1b92b43b00f47af76c4720bf003de27',
      '02e9e6b01037d015e8092c27fc30ccd13271c648efc5086c7c8c4ab1bac38f991f',
      '035a53c95133c425374808a415b96ff84a544a17332c704931aaf967938e4b6b99',
      '0399739faf9d43ed932704e199edf0af22d6fc32a897caeada953b144196b6c14a',
      '03c174748383d4a38dc11bc56e06e093cd9ba0af448c1af43381d1000fdf536b84',
      '033a3c5fa4d60919319d1ade800032a12ce81cca59398f522422a30df1cad158bb',
      '039761b899dd270a56cdb6b107fdb364748261896d54774d3e455d2146495bd9cc',
      '03e8ccd7e358027c258649e322141da3afd5f8ba6294ab539d49d619c5655142e4',
      '026f1d9db5ad70de7e74f80aec2db7006b331143f50c8eacf4fdccdb34784701f9',
      '03aea21a4e601c25f14a95846b5b3199559382abec2c522aa00d057fa8bf688c95',
      '03d2398b439d403a49121c3e31512a61344b1b16976b865470b7708c896f7dc4b4',
      '03ddf0fc891cd9a4b25d0b83acffdb0345890236bdaf86f687bfbdb5aec9e8b646',
      '03be0f08d71ab05da8369be3c9430aba1b99ad9bb9088fa674e7794f42954ca9ca',
      '023261fe2c9bc7c62665ed905e65b74becd6a19734801a8e3aa0186451df868306',
    ],
    forceIPv6: false,
    maxPeers: 100,
    bootstrapAddress:
      'QmaAV3KD9vWhDfrWutZGXy8hMoVU2FtCMirPEPpUPHszAZ@95.217.215.141:41011',
  },
  genesis: {
    TPKEPublicKey:
      '0x070000007fa4ed8eb614f083b0924c5afa8e32c3fe251831fba2c86b507af72aaee308ca63994f9012773979e18e7f94ff019293',
    blockReward: '5.000000000000000000',
    basicGasPrice: '0.000000100000000000',
    balances: {
      '0x6bc32575acb8754886dc283c2c8ac54b1bd93195': '1000000',
      '0xa807fcf4d6c583cd55dd1ba8133c824817c459b5': '1000000',
      '0x99b28852a77bb9507df960fa471cda540e1032e7': '1000000',
      '0x90cc369ed958cddce891212f611be1d016a38cba': '1000000',
      '0x7e88c72075c29590c56f49a269dabd79f6cb70fc': '1000000',
      '0xf7f505fdf63016f8c741b6bfe1bc61c87c6f42cb': '1000000',
      '0x8d019e4c1b1497f13a5b1f0853acc02242e09d22': '1000000',
      '0x879cea3d01e6a4408f679500dcab01c98bb77395': '1000000',
      '0x8f52b7bcebc9d53d40b92072972ffc8fa81c5ca2': '1000000',
      '0xc0a0cad126204ed73fd6156e475b1d4a3ec14047': '1000000',
      '0x917fcb9bb31fde83a7d762021702d29648f52e14': '1000000',
      '0xda850a4531657f1c11e3da4a7fbb427afdeefa07': '1000000',
      '0xe74c50a879639076996ee3443a54d865d6672da0': '1000000',
      '0x42a284dc9bd1b56c97afe404312f1f98c9d93f5a': '1000000',
      '0x75ac8a7caf57434e54e2bd92d95b105d227341aa': '1000000',
      '0xec5ce063bea97a02fe1a59f534fb43255ef75a72': '1000000',
      '0x273f20d49203b96cd44378035715720b3a8eb4f4': '1000000',
      '0x3a68e1696891a0dc5aa61c0a369581a5a462c8c9': '1000000',
      '0x6490ab30318e925c36820872634c490c8433f2bc': '1000000',
      '0x24a2be13689713b5fb6ddf00fb308f4aa03d4064': '1000000',
      '0x109711dc9706ef7775339eda4bbee97b88978103': '1000000',
      '0xaad36dada579912bd3bf54eb4518533776d9f38f': '1000000',
      '0x0769df1dc837dc6d600321692eac36430227369c': '1000000',
    },
    validators: [
      {
        ECDSAPublicKey:
          '023a29bff500b9b2e5a0f02328883f4e03225219cecacbceddc1cb9195fe8036d7',
        thresholdSignaturePublicKey:
          '0xca1679fbc53c623c264553463c2ae4226721c1633efe5fb33cce49f0a64739c80d87ac2d0079f397d8e1802fece53b04',
      },
      {
        ECDSAPublicKey:
          '03d7745471ddabae4ce8ba8abc85d50fc157b9552f4205861917ad77052c54740b',
        thresholdSignaturePublicKey:
          '0x894dcee84bd8a7dc363dbc3ce4e0738c84c55b8dde2b5f3ffb8f61d4420b6e9b102db48e014dbdaf876c61f680eedf0a',
      },
      {
        ECDSAPublicKey:
          '02523a7c809a1eadbf371fd8e670db01f15256c6db861bfb6a2c7777408aa21dcc',
        thresholdSignaturePublicKey:
          '0xaf725620aede3436f57467af9172c4cc883ef2a8117a55ece7577cfbb78f8cada99c29d738b082e32d4cbe1b0d19e48b',
      },
      {
        ECDSAPublicKey:
          '025e8992a2395c7d7323044b1c52d0b4f58cb77f7c1a0af8342f19ce3913753a19',
        thresholdSignaturePublicKey:
          '0x39b167b136722efb8c4aaf6979fd7e78c46feb31c1127e8aae41ac1918e25f72a6cade658dabae682d3c5fcaf5f70e83',
      },
      {
        ECDSAPublicKey:
          '03fef56b72f43d18415b33e970fd7cbcfaf9b9a6104342d790fe57df2940094dff',
        thresholdSignaturePublicKey:
          '0x9c23d3ba9d4c11c74bc948148b15efdf411001a261fc7a60b6a034c06a6e93c328c231acfeb0d71fd8aa0de3abdce196',
      },
      {
        ECDSAPublicKey:
          '030db98f74180b65078a8fd90da8d700e2099afd79d360fdcc8fcb68d4f47f4be4',
        thresholdSignaturePublicKey:
          '0xd5813fa20a2723c860a12f545f6b89e4d620d532218add235c0657136ab62a4a92be2b60dcc213329d551e452dee0018',
      },
      {
        ECDSAPublicKey:
          '02fcced63a9226447ea8e188a29b265631312b67996a7cd400331edae2df7af3c3',
        thresholdSignaturePublicKey:
          '0x3b8dc0e676ee16d8538a66e8f3f3aa68426b935e8a098233104264489d2fa019670b50030055db6e950c1f4bad3def0c',
      },
      {
        ECDSAPublicKey:
          '037e1228fbdc69c46cf8d5b03cee6f6e56230d32fb6bfcbe2ff9858947b584350b',
        thresholdSignaturePublicKey:
          '0x69391b48ab9e2ccbf2b0d07e8eb9e6007c1f11938f192aaa5659d0e3384abf48d573a3730703ebe78f6d04d5064bd386',
      },
      {
        ECDSAPublicKey:
          '02eb23f1b9ff457fa8ce2819a230757ea4f1b92b43b00f47af76c4720bf003de27',
        thresholdSignaturePublicKey:
          '0x31fc382c51c10d562d03ee33b4a67e2589f379f86bfe33e0a4649c25d6c650ad1c9b783542bfc499889fc935edbe6d18',
      },
      {
        ECDSAPublicKey:
          '02e9e6b01037d015e8092c27fc30ccd13271c648efc5086c7c8c4ab1bac38f991f',
        thresholdSignaturePublicKey:
          '0x075ccc8648a4efb9d2a17e2be152b3fb377eb7aae597c2e63e967696ccdb3f81cb3077f437555c27e135098818212888',
      },
      {
        ECDSAPublicKey:
          '035a53c95133c425374808a415b96ff84a544a17332c704931aaf967938e4b6b99',
        thresholdSignaturePublicKey:
          '0x8bc07d89400cb9218e1d03887bd55395b21ce18c1ea406411c4a2d8e1ca0c08937f2eb6f7e7879bf25642b28a96b9613',
      },
      {
        ECDSAPublicKey:
          '0399739faf9d43ed932704e199edf0af22d6fc32a897caeada953b144196b6c14a',
        thresholdSignaturePublicKey:
          '0x7f2d0dedbfbde1099c1c1fa32ae30a23970b170d1f11ad676115ca75bf2ddd874d4e5915e76d1969c97b4f1338bed297',
      },
      {
        ECDSAPublicKey:
          '03c174748383d4a38dc11bc56e06e093cd9ba0af448c1af43381d1000fdf536b84',
        thresholdSignaturePublicKey:
          '0x9205aa5c406613a5fa0065cd722ce9684181961c1aef79d458ad5033099d1663b69fee0bfdc40a18a7302e1b362d6b09',
      },
      {
        ECDSAPublicKey:
          '033a3c5fa4d60919319d1ade800032a12ce81cca59398f522422a30df1cad158bb',
        thresholdSignaturePublicKey:
          '0xb358f987ca5c998ca0b3f072c3a0753bf1bacce359104bd70cdb79d23d5cf392101093a899c5ba3dc23de90302295a05',
      },
      {
        ECDSAPublicKey:
          '039761b899dd270a56cdb6b107fdb364748261896d54774d3e455d2146495bd9cc',
        thresholdSignaturePublicKey:
          '0x1fc17e59cd415b81ea378f21d3b6fb88f457d59f646cfaf323c206b0b4cf06f340877e57577ec37fb214eee2135c7600',
      },
      {
        ECDSAPublicKey:
          '03e8ccd7e358027c258649e322141da3afd5f8ba6294ab539d49d619c5655142e4',
        thresholdSignaturePublicKey:
          '0x8cced1322fd2ff8ea4f8f65a08237330c2255a26471d03789089d5e7b9d499b76c779a17b606aa0b7f13f49ce643af0a',
      },
      {
        ECDSAPublicKey:
          '026f1d9db5ad70de7e74f80aec2db7006b331143f50c8eacf4fdccdb34784701f9',
        thresholdSignaturePublicKey:
          '0xd3e229bc47ba327f2845cc3cf237a7750a3799c54b91313411790883d83adcee1572cd69acf5cfa9a10389f2cd509582',
      },
      {
        ECDSAPublicKey:
          '03aea21a4e601c25f14a95846b5b3199559382abec2c522aa00d057fa8bf688c95',
        thresholdSignaturePublicKey:
          '0x6abc198dd46fb8502021b3998adcc8f4140cb468e2ed54b11249592489516939f1ab7408b28c0f101739b6745dd09a83',
      },
      {
        ECDSAPublicKey:
          '03d2398b439d403a49121c3e31512a61344b1b16976b865470b7708c896f7dc4b4',
        thresholdSignaturePublicKey:
          '0xa6b7d5bba3cbebaf00c5c60dac35576b40e4453b88bfe827381218fe67f6348a8d84c8335d1fd6047659fb367bd4e487',
      },
      {
        ECDSAPublicKey:
          '03ddf0fc891cd9a4b25d0b83acffdb0345890236bdaf86f687bfbdb5aec9e8b646',
        thresholdSignaturePublicKey:
          '0xc576781ae17832a39fcd0c16ff5169d71d4f0254f2fce80cce684c3ebca9a0d3abbebb1e9acf1f8a9f1b0c9778c97015',
      },
      {
        ECDSAPublicKey:
          '03be0f08d71ab05da8369be3c9430aba1b99ad9bb9088fa674e7794f42954ca9ca',
        thresholdSignaturePublicKey:
          '0x194af7d18b8f7ebc65372c7ebe08cadce84669c51304a9fc7fbc54cead8c51e299df09f66b4ffe818820fb0da7ef0899',
      },
      {
        ECDSAPublicKey:
          '023261fe2c9bc7c62665ed905e65b74becd6a19734801a8e3aa0186451df868306',
        thresholdSignaturePublicKey:
          '0x6c7a7524d1f5a3e07ee48aa9cd02f0d823d5b0fef9b3d41b36bca10c6792f4eac7cab771a2cd914085cbe20eb07d260b',
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
