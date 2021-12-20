
# Chat application - final project

*
The project creates a Chat application similar to Discord, WhatApps, or Keybase with a minimal set of features. The user can securely create and manage channels, invite friends and post messages in a secure manner. By the end, the user will be able:

* To authenticate itself using an external provider with Oauth.
* Navigate through his channels and the messages associated with the current channel.
* Share the channel access with other users.
* Access the channel to which he was invited.
* Send new messages.
* Edit and remove his messages.
* Use the user Gravatar if any or provide a default randomly generated Gravatar, choose an avatar proposed by the application.
* Modify his settings.
* Trust the Chat application because it is secured and the resource access is verified.

*

## Usage


* Clone this repository, from your local machine:
  ```
  git clone https://github.com/zack242/project.git
  cd project
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  npm install
  # Start the back-end
  npm start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  npm install
  # Start the front-end
  yarn start
  ```

* Start dex with docker
    ```bash
    run docker

    docker-compose up
    ```

* Test the back-end
        ```bash
        cd back-end

        npm run test
        ```

## Author

*NEZRI Dan, dan.nezri@edu.ece.fr*
*TOZY Zakaria, zakaria.tozy@edu.ece.fr*

## Tasks

Project management

* Naming convention   
  *2/2 Respect of the community conventions and best practices (camel case),consistency*
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
