
# Chat application - final project

*presentation, introduction, ...*

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/adaltas/ece-webtech-2021-fall.git webtech
  cd webtech/courses/webtech/project
  ```
* Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory:   
  ```
  # Install Go
  apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make
  make examples
  ```
  Note, the provided `.gitignore` file ignores the `dex` folder.
* Register your GitHub application, get the `clientID` and `clientSecret` from GitHub and report them to your Dex configuration. Modify the provided `./dex-config/config.yml` configuration to look like:
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
      clientID: xxxx98f1c26493dbxxxx
      clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
      redirectURI: http://127.0.0.1:5556/dex/callback
  ```
* Inside `./dex-config/config.yml`, the front-end application is already registered and CORS is activated. Now that Dex is built and configured, you can start the Dex server:
  ```yaml
  cd dex
  bin/dex serve dex-config/config.yaml
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Optional, fill the database with initial data
  bin/init
  # Start the back-end
  bin/start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Start the front-end
  yarn start
  ```

* Start dex with docker
    ```bash
    run docker

    docker-compose up
    ```


## Author

*name, email, ...*

## Tasks

Project management

* Naming convention   
  *2/2*
* Project structure   
  *4/4 the project is split en 3 folder (back-end/frond-end/dex)*
* Code quality   
  *4/4*
* Design, UX   
  *4/4*
* Git and DevOps   
  *3/4 we use docker orchstration to run dex*

Application development

* Welcome screens   
  *3/4*
* New channel creation   
  *6/6*
* Channel membership and access   
  *4/4*
* Ressource access control   
  *3/4*
* Invite users to channels   
  *6/6*
* Message modification   
  *2/2*
* Message removal   
  *2/2*
* Account settings   
  *4/4*
* Gravatar integration   
  *2/2*
* Avatar selection   
  *4/4*
* Personal custom avatar   
  *place your graduation and comments*

## Bonus

*Smiley integration in the messages*
