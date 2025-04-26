import type { NextConfig } from "next";
import withTM from "next-transpile-modules";

const withTranspile = withTM([
  "antd",
  "@ant-design/icons",
  "@ant-design/icons-svg",
  "rc-util",
  "rc-pagination",
  "rc-picker",
  "rc-select",
  "rc-field-form",
  "rc-tabs",
  "rc-overflow",
  "@babel/runtime"
]);

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Keep this line for React Strict Mode
  webpack(config, { dev }) {
    // Disable caching for development
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default withTranspile(nextConfig);
