## Ask Me Anything

* A responsive web app like Stack Overflow
* My project for the 2020-2021 Software As A Service Course of National Technical University of Athens
* Two versions of the back-end were built, the first one following the Service Oriented Architecture (SOA) and the second one following the Microservices Architecture.
* By default, the front-end is using the SOA back-end. If you want to try the microservices architecture, navigate to `/about` using the `about` link of the `footer` and just click on the corresponding button.
* For further explanation about the back-ends switching, see the `front-end/README.md` and the `front-end/src/api.js` file s

### Technologies used:
* back-end:
* * Database: [postgreSQL](https://www.postgresql.org)
* * SOA/microservices: [nodejs](https://nodejs.org), [nestjs](https://nestjs.com), [expressjs](https://expressjs.com/), 
* front-end:
* * [ReactJs](https://reactjs.org) (with npx create-react-app)

### Deployment
* Project is deployed on heroku.
* Try it at: https://askmeanything52.herokuapp.com
* Each service of the two back-end architectures and the front-end are deployed as seperate apps.
* When visiting the web app, you might have to wait some short time before the content is displayed and each one of the services is available.
* That's because it is deployed on [Heroku free dynos](https://devcenter.heroku.com/articles/free-dyno-hours) and after 30 minutes of no usage, all the servers go to sleep mode.

### Requirements that the project covers
* Anyone who visits the web app can create an account or continue as an anonymous user

* Unauthorized users can:
    * Explore the `latest questions` and their `answers` in the `home page`
    * Visit a page with 
        * all `questions' statistics`
        * all `questions' analytics` organised by their dates
    
* `Authorized` users have also the ability to:
    * Keep track of their activity (all of their `questions` and `answered questions`)
    * `Upvote` (or remove from their upvoted) `questions` and `answers`, helping other users gaining `points`
    * `Upload questions` with title, text and `attach keywords` to them
    * `Answer questions` to help other users
        * Visit another `user's profile page` where they can see
        * the basic information about the user
        * `statistics` about his/her questions and answers
        * `analytics` about his/her questions
    * Have their own `profile page` to keep track of their `points`, `questions` and `statistics`
    * Keep track of their `ranking` among all the other users
        * Visit a `keyword's page` and see:
        * `statistics` about its questions
        * `analytics` about its questions
    * Visit a page where they can `search` for a `keyword`, typing its title in a search bar and see its `statistics` and `analytics`

### Directories structure:
* `Back-end` and `front-end` were developed as seperate modules.
* For more details head to their individual `READMEs`
* `Documentation`:
    * Contains a `Visual Paradigm Project` with 
        * Requirement diagrams
        * ER, UML Class, Component and Deployment Diagrams