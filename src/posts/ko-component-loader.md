---
title: A knockout component loader
date: 2016-03-04
---

Recently, I had a reason to dust of some old knockout extensions I made a while back. At my current assignment a couple of applications are using knockoutjs for client side stuff. I wrote this custom component loader to be avoid having to pre register any components using the knockout component binding. 

It relies on naming conventions for fetching the view model and template using requirejs. This also removes the need to explicitly declare a template and viewmodel in the component module. For a more detailed description, check out [https://github.com/jsannerstedt/componentLoader](https://github.com/jsannerstedt/componentLoader)