Demo: http://moflow.meteor.com

# Outline
A skeleton front-end framework that can be quickly used to build mobile html5 apps that feel as smooth as possible Includes:
- Meteor
- Famous
- FlowRouter
- [Famodev](https://github.com/particle4dev/famodev)

# Getting started
clone the repo

    bin/run.sh

Will start it on port 3010 (there are some other utility scripts in /bin too).

# Dev notes

## FlowRouter
Better lifecycle management than IronRouter.

## Famous Flex
Making famous much more usable with awesome flexible scrolling views.

## FamoDev
Forked to make it compatible with [Famono](https://github.com/raix/famono)
FamoDev allows you to add reactive meteor templates to any Famous surface.
Example:

```
var ReactiveTemplate = famodev.ReactiveTemplate;

var reactive = new ReactiveTemplate({
    template: Template.mytemplate,
    data: Collection.find().fetch(),
    properties: {
    }
});
```



Look at famodev source `src` folder for more docs

# ChatRoom!

[![Join the chat at https://gitter.im/dcsan/moflow](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dcsan/moflow?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
