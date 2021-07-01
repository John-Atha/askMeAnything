## BACK-END

### Directories structure
* There are two main directories, one for the `SOA` and one for the `microservices` architecture
* Each one of these directories contains a sub-directory with all the `components` (services) and a sub-directory with a json file containing the `postman` tests for the `REST APIs`
* In the `SOA` directory, there is also the `db` directory with some python scripts and SQL code for the production of some dummy data used during the app's development
---

### SOA
* Using `nestjs`, I built four `services`, each one as a seperate `nest project` with its own directory:
    * Authentication
    * Question-manager
    * Question-run
    * Analytics-statistics
* These services 'collaborate' using the `Enterprise Service Bus` (esb) which was built using `nodejs` and `express`
* The four services retrieve the needed data via asynchronous calls to the `data-layer`, which is a seperate `nest project` and is the only component that has immediate access to the `database` 
* Authentication was succeeded using [passport](http://www.passportjs.org) and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

---

### Microservices architecture
* Using `nestjs` I built five `micro-services`, each one as a seperate `nest project` with its own directory:
    * Authentication-microservice
    * Questions-microservice
    * Answers-microservice
    * Analytics-microservice
    * Statistics-microservice
* Each microservice has its `own database`
* The databases are synchronized via the `choreographer`
* The choreographer was built using `nodejs`, `express` and `redis`
* Everytime that a microservice updates its database, a `message` is being `published` to a `redis channel` and it is being broadcasted to all the `channel's subscribers servcices`, which then update their databases accordingly.
* Authentication was succeeded using [passport](http://www.passportjs.org) and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

---

For more details about the services functionalities and data kept, see the `component`, `class` and `ER` diagrams of the documentation's `VPP file`