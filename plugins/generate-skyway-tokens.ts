/**
 * @name generateSkywayTokensPlugin
 * @author massivebugs
 *
 * Generates Skyway tokens for agents and hosts with corresponding permissions.
 * These tokens are valid for 3 days and must be regenerated to continue using the Skyway platform.
 *
 * Usage:
 *  - Use this as a Vite plugin. Every time a project using this plugin is built, this will
 *    generate token JSON files in the /public directory.
 *  - Set your "SKYWAY_APP_ID" and "SKYWAY_SECRET" in your environment variables.
 *
 */

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import jsrsasign from "jsrsasign";
import { v4 as uuidv4 } from "uuid";

export function generateSkywayTokensPlugin() {
  dotenv.config();

  const appId = process.env.SKYWAY_APP_ID;
  const secret = process.env.SKYWAY_SECRET;

  if (!appId || !secret) {
    throw new Error(
      "generateSkywayTokens - Could not find skyway configurations in env"
    );
  }

  return {
    name: "generate-skyway-tokens-plugin",
    buildStart() {
      // Generate the file during production build
      const agentToken = getAgentPermissions(appId);
      const hostToken = getHostPermissions(appId);

      generateFile("agent", encode(secret, agentToken));
      generateFile("host", encode(secret, hostToken));
    },
  };
}

function generateFile(tokenType: "agent" | "host", token: string) {
  const content = JSON.stringify({ token });
  const filePath = path.resolve(__dirname, `../public/${tokenType}-token.json`);

  fs.writeFileSync(filePath, content);

  console.info(`generateSkywayTokens - File generated at ${filePath}`);
}

function encode(secret: string, payload: any) {
  return jsrsasign.KJUR.jws.JWS.sign(
    "HS256",
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
    JSON.stringify(payload),
    secret
  );
}

const getAgentPermissions = (appId: string) => {
  return {
    jti: uuidv4(),
    iat: Math.floor(Date.now() / 1000), // nowInSec
    exp: Math.floor(Date.now() / 1000) + 259200 - 1, // 3 days - 1 sec
    scope: {
      app: {
        id: appId,
        turn: true,
        actions: ["read"],
        channels: [
          {
            name: "default",
            actions: ["read"],
            members: [
              {
                name: "agent",
                actions: ["write"],
                publication: {
                  actions: ["create"],
                },
              },
            ],
          },
        ],
      },
    },
  };
};

const getHostPermissions = (appId: string) => {
  return {
    jti: uuidv4(),
    iat: Math.floor(Date.now() / 1000), // nowInSec
    exp: Math.floor(Date.now() / 1000) + 259200 - 1, // 3 days - 1 sec
    scope: {
      app: {
        id: appId,
        turn: true,
        actions: ["read"],
        channels: [
          {
            name: "default",
            actions: ["write"],
            members: [
              {
                id: "*",
                name: "*",
                actions: ["write"],
                publication: {
                  actions: ["write"],
                },
                subscription: {
                  actions: ["write"],
                },
              },
            ],
          },
        ],
      },
    },
  };
};
