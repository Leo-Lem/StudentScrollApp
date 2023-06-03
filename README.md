# StudentScroll App

[![CI/CD](https://github.com/Leo-Lem/StudentScrollApp/actions/workflows/cicd.yml/badge.svg)](https://github.com/Leo-Lem/StudentScrollApp/actions/workflows/cicd.yml)

This is the web app bringing student scroll to life! ([studentscroll.net](https://studentscroll.net))

StudentScroll brings together students from different backgrounds. You can meet like-minded people, keep up with what's going on, and use our responsive web app.

It works on all devices and provides a range of features. After the quick and intuitive sign up, you can dive right in and see what's going on in other student's posts.

Find your friends, interesting posts and more using our handy search bar.

Or follow interesting creators. Maybe post some interesting thoughts yourself…

Or start a chat right from a student's profile and keep it personal with one on one chat messaging.

Or do you want to find some new people nearby? We've got you covered: Our innovative nearby feature lets you find other users near you!

Our app is fully customisable with a range of themes and different languages to choose from.

So what are you waiting for: [Jump right in!](https://studentscroll.net)

# Building, testing and running the StudentScrollApp

As we are using plain npm, the command are nothing extraordinary. Before you try to build, run or test our app, you should install all dependencies.

```bash
> % npm i --legacy-peer-deps
```

_Note_: Newer npm versions changed the way peer dependencies (dependencies of your dependencies) are installed. As we have no control over the upstream dependencies and would otherwise run into unresolvable conflicts, we need to provide this flag. This instructs npm to use the old (and stable) peer dependency system. Until npm or our dependencies provide an option to resolve the conflicts we will have to stick with this…

Now you can use our different npm scripts:

```bash
> % npm [start | test | run lint | run format | run build]
```

- The `start` script launches the app in a development environment and enables you to view auto-updating changes.

- The `test` script launches the tests in watch mode which will run tests whenever you update them.

- The `run lint` script lints all code, fixes all simple issues and provides you with a list of more complicated issues (it also formats the code).

- The `run format` script formats all code according to our project rules.

- The `run build` script creates a fully optimized production build which could be used to deploy the app.
