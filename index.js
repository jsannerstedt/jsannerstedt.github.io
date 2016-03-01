var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var template = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var branch = require('metalsmith-branch');
var excerpts = require('metalsmith-excerpts');
var paginate = require('metalsmith-pagination');
var drafts = require('metalsmith-drafts');

Metalsmith(__dirname)
    .clean(false)
    .use(drafts())
    .use(collections({
        posts: {
            pattern: 'posts/**/*.md',
            sortBy: 'date',
            reverse: true
        },
        nav: {}
    }))
    .use(findTemplate({
        pattern: 'posts',
        templateName: 'article.html'
    }))
    .use(markdown())
    .use(excerpts())
    .use(branch('pages/**.html')
        .use(permalinks({
            pattern: './:title',
            relative: false
        })))
    .use(branch('posts/**/*.html')
        .use(permalinks({
            pattern: 'posts/:title'
        })))
    .use(paginate({
        'collections.posts': {
            perPage: 5,
            template: 'archive.html',
            path: 'archive/:num/index.html',
            first: 'archive/index.html',
            pageMetadata: {
                title: 'Archive'
            }
        }
    }))
    .use(template('swig'))
    .destination('./')
    .build(function(err) {
        if (err) {
            throw err;
        }

    });

function findTemplate(config) {
    var pattern = new RegExp(config.pattern);

    return function(files, metalsmith, done) {
        for (var file in files) {
            if (pattern.test(file)) {
                var _f = files[file];
                if (!_f.template) {
                    _f.template = config.templateName;
                }
            }
        }
        done();
    };
}
