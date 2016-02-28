var Metalsmith = require('metalsmith');
var concat = require('metalsmith-concat');
var staticFiles = require('metalsmith-static');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var template = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var branch = require('metalsmith-branch');
var excerpts = require('metalsmith-excerpts');
var paginate = require('metalsmith-pagination');
var cleanCss = require('metalsmith-clean-css');
var autoprefixer = require('metalsmith-autoprefixer');
var browserSync = require('metalsmith-browser-sync');
//var tags = require('metalsmith-tags');

Metalsmith(__dirname)
    .clean(false)

    .use(concat({ files: 'public/style/**/*.css', output: 'public/style/main.css' }))
    .use(staticFiles({ src: 'public', dest: './' }))
    .use(autoprefixer())
    .use(cleanCss({
        files: 'style/main.css'
    }))
    //.use(tags({
    //    "handle": "tags",
    //    "path": "topics/:tag/index.html",
    //    "pathPage": "topics/:tag/:num/index.html",
    //    "perPage": 6,
    //    "layout": "/partials/tag.hbt",
    //    /* Can also use deprecated template property.
    //     "template": "/partials/tag.hbt",
    //     */
    //    "sortBy": "date",
    //    "reverse": true,
    //    "skipMetadata": false,
    //    "slug": {
    //        "mode": "rfc3986"
    //    }
    //}))
    .use(findTemplate({
        pattern: 'posts',
        templateName: 'article.html'
    }))
    .use(collections({
        posts: {
            pattern: 'posts/**/*.md',
            sortBy: 'date',
            reverse: true
        },
        nav: {}
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
    
    .use(browserSync({
        server: "./",
        files: ['src/**/*.md', 'templates/**/*.html', 'src/public/**/*', './index.js']
    }))
    .build(function (err) {
        if (err) {
            throw err;
        }

    });

function findTemplate(config) {
    var pattern = new RegExp(config.pattern);

    return function (files, metalsmith, done) {
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
};
