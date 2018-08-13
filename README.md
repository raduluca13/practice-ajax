
  

  

# practice-ajax

  

  

<p  align='center'>
<img  height=250  src="https://raw.githubusercontent.com/iampava/practice-ajax/master/public/images/screenshot.png" />
</p>

  

  

Practice AJAX by integrating the Front-end of this app with the already existing NodeJS API. Although the app in itself is nothing fancy, it's good exercise because you will have to integrate:

  

  

- Get

  

- Post

  

- Put

  

- Delete

  

  

as well as

  

  

- setting custom headers to enable Authentication

  

## Motivation

I give JavaScript workshops/trainings and one of the topics is of course AJAX! So, I created this app to have something we can work on, then open-sourced it for the other trainers out there who might need a practice app as well.

  

In case you're not a trainer but you'd still like to practice AJAX, don't despair! I will do my best to explain **how to install this app** and what the **expected final result** should be, so you can do it by yourself.

## Some more about the app

You can think of this app as a pet-management tool. The only thing missing from it is the integration with the server. When that is done you should be able to:
* **read** the existing pets 
* **create** a new pet
* **update** an existing pet
* **delete** an existing pet

Here's a video of the finished result:

### API
The Back-end exposes a REST API through which you can interact with the pets. I documented this API in RAML format. Check out the <a href="#installation"> installation section</a> for how to use the documentation.

### JavaScript

On the Front-end part I already created two JavaScript files: an **app.js** which is the main file of the app and an **utils.js** which provides some utility functions.

I wrote those to help you with the implementation so take a good look at them before you start coding.

## <p id="installation">How to...</p>

### Install
To install this app just go into the cloned-repo folder and run:

```
$ npm install
```

### Run
To start the server in the default mode run: 
```
npm run serve
```
and then navigate to [localhost:8080](http://localhost:8080).  
<br/>
If you also want to enable the *dummy* Authentication, then run:
```
npm run serve-with-auth
```
then navigate to the same URL.

### Documentation

I've documented the API in [RAML](https://raml.org/) format. In order to read it you will need to first convert it to an HTML page.

```
npm run raml
```
Then open the **api.html** file found in the API folder. You should see something like this:


<p  align='center'>
<img  height=250  src="https://raw.githubusercontent.com/iampava/practice-ajax/master/public/images/raml.png" />
</p>

## Good luck! 🥂
<p align="center">
Made with ❤ by <a href="">Pava</a>
</p>
