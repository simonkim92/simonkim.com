module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.md$/,
            use: [
              {
                loader: 'raw-loader',
              },
            ],
          },
        ],
      },
    },
  },
};
