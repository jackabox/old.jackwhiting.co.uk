---
title: "Moving WordPress Media Libraries From One Site to Another"
layout: post
permalink: /moving-wordpress-media-libraries
---
Every now and then you want to set up a fresh WordPress install, usually when the site is going in a different direction and a lot of their data then becomes redundant. When working with a client I had to find a way to do this and keep hold of all their media. Before I was ready to import the media I created a blank WordPress site (v4.3), the reason I used a blank site was to make sure there were no conflicts with IDs of the media I was importing.

WordPress stores all media library uploads into the database. Firstly, it creates a new post entry, this has a type of attachment. Secondly, it creates metadata attached to the post to store all the property information of the image. Knowing these two things allows us to set up a query on the SQL to grab the data.

### Getting the Posts
We will get the posts first. To do this you will need to load into your selected database management tool. I am a big fan of Sequel Pro so the following screenshots will be utilising that tool. In your tool we will run the following query on the database..

{% highlight sql %}
SELECT * FROM `wp_posts` where `post_type` = "attachment"
{% endhighlight %}