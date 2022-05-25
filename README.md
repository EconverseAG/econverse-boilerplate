# STORE_NAME
VTEX IO Store source code.

## Running the project

### 1. Login

First things first, you have to login to `STORE_NAME`

```bash
$ vtex login STORE_NAME
```

### 2. Changing workspace

After logging in to the account, you must use another workspace for development, like `dev` for example:

```bash
vtex use dev
```

### 3. Start

After logging in to the account, you can simply run both `store-theme` and `store-components` app using the following command:

```bash
$ yarn start
```

This script is set to execute the `start` scripts of each app, running `vtex link --verbose` and any styles compiler needed.

### 4. Open in browser

Now, in another terminal, you can use the following command to open the corresponding webpage in your current workspace:

```bash
vtex browse
```

### All set!

You are ready to code. :)
