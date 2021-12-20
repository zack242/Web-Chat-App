
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

*NEZRI Dan, dan.nezri@edu.ece.fr*
*TOZY Zakaria, zakaria.tozy@edu.ece.fr*

## Tasks

Project management

* Naming convention   
  *2/2 Respect of the community conventions and best practices, consistency*
* Project structure   
  *4/4 the project is split en 3 folder (back-end/frond-end/dex)*
* Code quality   
  *4/4 Indentation, understandability, lint usage and validation, line spacing.*
* Design, UX   
  *4/4 A fairly modern design, using MUI components*
* Git and DevOps   
  *3/4 we use docker orchstration to run dex*

Application development

* Welcome screens   
  *4/4 When a new user logs in, he/she is taken to a home page where he/she can learn more about the chat functionality*
* New channel creation   
  *6/6 Each user can create a channel by choosing a name and guests.*
* Channel membership and access   
  *4/4 Every request sent to the API server (back-end) contain the user access token in the HTTP header with its identity (email). Once the token is validated by the authentication middleware, the user ID be associated with the created channel (eg `owner` property). If the user does not yet exist in the database, he must be created automatically.*
* Ressource access control   
  *3/4 A user has access only to the channel he created or to the channels he was invited to. The API is able to prevent unexpected access and intrusion attempts.*
* Invite users to channels   
  *6/6 A channel can have one to  members, the creator being the first member. It is possible to invite new members either at the channel creation or later.*
* Message modification   
  *2/2 Once a message is sent and shared, only the message author must be able to modify its content.*
* Message removal   
  *2/2   Once the message is sent and shared, the message author, and only him, must be able to remove it.*
* Account settings   
  *4/4 A screen for the user to modify his/her personal settings (email, name, language, theme, ...)*
* Gravatar integration   
  *2/2 When logging in, the application will get the login email address and will load the avatar (if any) from the Gravatar platform. The avatars are automatically updated, the user changes the profile pictures.*
* Avatar selection   
  *4/4 The user can choose between a selection of personalized avatars*
* Personal custom avatar   
  *2/6 The upload did not work. Apart from that, everything is set up for the functionality to work*

## Bonus

*Smiley integration in the messages*
