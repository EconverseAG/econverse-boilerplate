import fs from 'fs';
import os from 'os';
import path from 'path';
import fetch from 'node-fetch';

const getFlags = () => {
  const flags = {};
  process.argv.slice(2).forEach(flag => {
    const [key, value] = flag.split('=');
    flags[key] = value;
  });
  return flags;
}

const args = getFlags();

console.log(args);

const homedir = '..';

const ACCOUNT = "STORE_NAME";

const getAuthToken = async ({ appkey, apptoken }) => {
  const payload = {
    appkey,
    apptoken,
  };

  const res = await fetch(
    `http://api.vtexcommercestable.com.br/api/vtexid/apptoken/login?an=${ACCOUNT}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    }
  );
  const res_1 = await res.json();
  return res_1.token;
};

(async () => {
  const token = await getAuthToken({
    appkey: args.appkey,
    apptoken: args.apptoken,
    workspace: args.workspace,
  });

  const tokens = {
    biggy: token,
  };

  const session = {
    account: ACCOUNT,
    login: "acesso@agenciaeconverse.com.br",
    token,
  };

  const workspaceData = {
    currentWorkspace: args.workspace,
    lastWorkspace: null,
  };

  const sessionDirectory = path.join(homedir, ".vtex", "session");

  if (!fs.existsSync(sessionDirectory)) {
    fs.mkdirSync(sessionDirectory, { recursive: true });
  }

  fs.writeFileSync(
    path.join(sessionDirectory, "tokens.json"),
    JSON.stringify(tokens)
  );
  fs.writeFileSync(
    path.join(sessionDirectory, "session.json"),
    JSON.stringify(session)
  );
  fs.writeFileSync(
    path.join(sessionDirectory, "workspace.json"),
    JSON.stringify(workspaceData)
  );
})();
