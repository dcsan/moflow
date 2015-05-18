This repo is just clone of [Famodev](https://github.com/particle4dev/famodev) Making it compatible with [Famono](https://github.com/raix/famono) I pull&push items only I need for my project.

Steps to include in your project

in your `lib/smart.require`

```
"famodev": {
    "git": "https://github.com/sayawan/famodev.git",
    "root": "src"
},
```

include `famodev` in your template

```
var ReactiveTemplate = famodev.ReactiveTemplate;

var reactive = new ReactiveTemplate({
    template: Template.mytemplate,
    data: Collection.find().fetch(),
    properties: {
    }
});
```

Look at source `src` folder for more docs


[![Join the chat at https://gitter.im/dcsan/flowwy](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dcsan/flowwy?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)