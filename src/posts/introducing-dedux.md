---
title: Introducing dedux
date: 2016-02-28
---

Some sort of dummy text to make lasdölfkaslkdfj asdfkj sldkjf s lksjdf lsk jlskdjf lksdjf lkjsdlkfj sdf


    import { createActions } from 'dedux';

    const actions = createActions(['firstAction', 'secondAction']);
    actions.firstAction.subscribe(payload => {
      console.log(payload);
    });
    actions.firstAction('hello'); // will log hello