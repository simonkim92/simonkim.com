module.exports = {
  // ... 기존 설정 ...
  module: {
    rules: [
      // ... 기존 rules ...
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
    ],
  },
};
