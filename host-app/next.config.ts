import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "host",
          remotes: {
            productsRemote:
              "productsRemote@http://localhost:3001/remoteEntry.js",
            basketRemote: "basketRemote@http://localhost:3002/remoteEntry.js",
          },
          exposes: {},
          shared: {
            react: { singleton: true, requiredVersion: false },
            "react-dom": { singleton: true, requiredVersion: false },
          },
        })
      );
    }
    return config;
  },
};

export default nextConfig;
