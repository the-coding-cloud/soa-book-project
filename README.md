# soa-book-project
Small web app illustrating microservices &amp; microfrontends

Architecture:
User enters the webpage at localhost:3000. This acts as the shell for the microfrontend: contains a Login component defined in the same module and uses a Remote component as well, importing it using Webpack Module Federation.
The requests from the frontend are send to the gateway, which redirects the call to the appropiate microservice.

System Diagram:
![c4-diagram](https://user-images.githubusercontent.com/26270030/217840583-c94b1b6f-30f3-4099-802b-621ad543b53c.png)
