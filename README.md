# README - Hackathon NodeJS

<hr>

## Instructions

We did this project with the following  [instructions](https://gist.github.com/capywebformation/bc26e439187e0c53905a2b66404d3c7c).

## Project group

- [MARY Maxime](https://github.com/dynaste)
- [KARCZINSKI Quentin](https://github.com/karzQ)
- [BA Oulimata](https://github.com/Ouli12)

## Some words

Please keep in mind we used the [LiveShare](https://visualstudio.microsoft.com/fr/services/live-share/) extensions on Visual Studio code, which let us start a live-coding session on one computer of us remotely. That's why we tried to make our commits looking closer to how we worked on the project.

## Requirements

Before lauching the projet you'll need to install some tools.
In order, you have to :

- Install [NodeJS](https://nodejs.org/en/) (Don't forget to read the [Compatibility](#compatibility) section).
- Install [MongoDB](https://www.mongodb.com/)
  - If needed, you can install MongoDB Compass (Interface for local and remote database)
- A code editor like [VSCode](https://code.visualstudio.com/) (Sublime Text, Brackets, VIM .. etc ..)
- Eventually install [Postman](https://www.postman.com/) to test the API endpoints without our [Front-end solution](https://github.com/Dynaste/front-end).

<hr>

## Use in local

### 1. Install the project

Firstly, you have to clone the project here : [Github link](https://github.com/Dynaste/back-end.git)
To do that, use the following command :
`$ git clone https://github.com/Dynaste/back-end.git`

You'll get the final state of our project.
You need to ensure, no service use the **port 3000**.

### 2. Usage

Please open the cloned directory as root project folder in your editor.
Then, go to the `/src` folder and tap the following commands in your terminal :

- Install the dependencies `npm install`
  - It will install all saved dependencies you'll find in package-lock.json.
- Launch MongoDB
  - On **MacOS**:
    - Use the command `mongo`
  - On **Windows**:
    - You have to specify where is your local database folder.
    - Create a path like this `C:\data\db`.
    - Go in the following path : `%Install_Directory%\MongoDB\Server\4.2\bin` and open a terminal in this folder, then use this command `mongod.exe --dbpath C:\data\db` to open MongoDB with the specified database to use.
- Launche the server with `npm start`
  - This command will launch the server with the [Nodemon](https://www.npmjs.com/package/nodemon) module, which let you modify your code and auto-refresh the server.

### NPM Modules used

- [validator](https://www.npmjs.com/package/validator) : Toolkit for checking any data type and/or data format.
- [bcrypt](https://www.npmjs.com/package/bcrypt) : Tools to encrypt & decrypt passsword.
- [dotenv](https://www.npmjs.com/package/dotenv) : Tools used to import `.env` file and use our environment variables.
- [nodemon](https://www.npmjs.com/package/nodemon) : Back-end library used to auto-refresh the server while editing the code.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) : Tools to use JWT in our secured requests.

### Compatibility

Those versions are just which we used in development. It's not the only versions, or range of versions you'll need to make it works.
But if you encountered an issue, keep in mind you can use the following versions:

**NodeJS** :  `12.13.1` **to** `14.15.0`
**NPM** :  `6.14.8` **to** `7.0.13`
