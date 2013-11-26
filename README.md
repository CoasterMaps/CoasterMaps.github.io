The development area for our webpage.
 The dev site can be found here: [vladk1.github.io/](http://vladk1.github.io/)
 

How to Build
------------

We're using Jekyll/Liquid combination that GitHub uses for it's GitHub Pages service. This means we have a free place to host our development site and we get all the cool features of Jekyll.

We've added SCSS into the mix to make creating and maintaining the CSS side of things easier.

So to get up and running you'll need to download and install [http://jekyllrb.com/](http://jekyllrb.com/) and [http://sass-lang.com/](http://sass-lang.com/). For both of these you'll need gem, which is a package management thing for Ruby. So you'll need a [http://www.ruby-lang.org/](http://www.ruby-lang.org/) installation too. That's all, now let's get the code:

    git clone https://github.com/vladk1/vladk1.github.io.git

Nice and easy. Now we need to do 2 things; compile the SCSS into CSS, and compile and serve the site. Luckily, this is really easy. Open up two Terminal tabs inside the directory of your newly cloned repository. Into the first type:

    sass --watch _scss:css

This handy command keeps a watch over the _scss directory for any changes you make. As soon as you save a file it recompiles all of the SCSS into CSS, ready for the browser. In the second Terminal tab run:

    jekyll serve --watch

This cool command keeps an eye on the entire repo directory and recompiles the site every time a change is made. It also starts up a local web server and hosts the newly compiled site for you. Visit [http://localhost:4000](http://localhost:4000) to take a look.

Now make changes to the site and refresh the browser to see them in action.

