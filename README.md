springbok
=========

**A lightweight ticket manager for development teams**

The aim of this product is to provide a fast and efficient way for development teams to track issues. It is primarily targeted as a replacement for email-based support.
Simply put, it is ticket manager meant to help small development teams (3 to 15 developers) manage the incoming flow of support requests.

**What Springbok is not**

- A bug manager. Use JIRA or a specialized tool of your choice for this
- An agile backlog manager. Springbok does not have the pretension to help you manage your sprint or flow, there are better tools for that.
- A full-fledged front support ITIL compliant software. Seriously, look elsewhere if you're into large complicated software.

Installation instructions
--------------

**Pre-requisites**

The following software needs to be installed before using Springbok:

- [Node.js](http://www.nodejs.org/). You need version 0.10.32 or newer.
- The npm package manager. It may be included in your node.js distribution depending on the installation source.
- [MongoDB](http://www.mongodb.org/). Tested on version 2.6.5 and on 3.0.3.

**Environment variables**

You may define the following environment variables to customize your Springbok installation:

- SPRINGBOK_PORT. Defines the network port used. Defaults to 3000.
- SPRINGBOK_MONGODB_URL: Url to reach the required MongoDB installation. Defaults to 'mongodb://localhost/springbok'.
- SPRINGBOK_LOG_DIR: Fully qualified path to a directory without a trailing slash. There is no default, the application will work without logging if you don't define this.

**Springbok installation**

1. Download the latest packaged distribution from git hub, or npm pack from the source. Do what you want.
2. Unpack the distribution somewhere
3. Run the following command to install the required dependencies

    npm install

4.  If you wish, you can unit test the application by running:

    npm test
    
    This can also be achieved directly by running gulp (which will also "lint" the JavaScript code using JSHint)
    
    gulp
    
5.  Start Springbok

    node bin\www
