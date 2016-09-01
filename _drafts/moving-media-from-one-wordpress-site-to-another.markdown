---
title: Moving Media from One WordPress Site to Another
date: 2016-06-30 14:40:00 Z
categories:
- wordpress
- tutorial
tags:
- wordpress
- mysql
---

Every now and then you want to set up a fresh WordPress install, usually when the site is going in a different direction and a lot of their data then becomes redundant. When working with a client I had to find a way to do this and keep hold of all their media. Before I was ready to import the media I created a blank WordPress site (v4.3), the reason I used a blank site was to make sure there were no conflicts with IDs of the media I was importing.

WordPress stores all media library uploads into the database. Firstly, it creates a new post entry, this has a type of attachment. Secondly, it creates metadata attached to the post to store all the property information of the image. Knowing these two things allows us to set up a query on the SQL to grab the data.

### Getting the Posts

We will get the posts first. To do this you will need to load into your selected database management tool. I am a big fan of [Sequel Pro](http://www.sequelpro.com/) so the following screenshots will be utilising that tool.

Run a query on the database to find all attachments...

~~~ sql
SELECT * FROM `wp_posts` where `post_type` = "attachment"
~~~

_Do not forget to update the prefix of **wp_** to whatever prefix your database uses._

If the query was executed correctly it should have returned any posts which are stored in the database as media files. For me, this was around 2800 records. Next, we need to export these.

![1-dS8o3XP2H2vC3RtUhECwog.png](/uploads/1-dS8o3XP2H2vC3RtUhECwog.png)

In [Sequel Pro](http://sequelpro.com) you can go to **File > Export** or use the OSX shortcut **CMD + SHIFT + E**. You will be presented with a screen that has multiple options. We want to export **queried results** as a CSV file, this will allow for easy import into our new database.

![1-wAip-3OnYmTa9c-pCUD9vg.png](/uploads/1-wAip-3OnYmTa9c-pCUD9vg.png)

You should now have all of your media attachments saved to your computer. We will import these later when we also have the metadata.

### Getting the Post Metadata

Getting the metadata follows the exact same method as getting the posts just using a slightly different query. For the metadata, there are multiple rows we’ll need to grab. Luckily for us, they all match a similar string and we can use a LIKE lookup on the table to get the data we need.

We are looking to return to sets of data per each media file, this is the **_wp_attached_file** and the **_wp_attachment_metadata**. Between these two rows of data, it will tell our WordPress install where the media file is located and the title, width, height, etc. To get the postmeta we need to query the database, using the following command, and then export the queried results.

~~~sql
SELECT * FROM `wp_postmeta` where `meta_key` LIKE "%wp_attach%"
~~~

### Importing the Media
To get the media table entries into our database we will need to import them. We will do this by using the CSVs we just created. The reason behind using a near blank WordPress state for this is because each post we are going to import will have an ID and we don’t want this to conflict with any existing data. _Note: you could change the entities (or us a script to do this) but the postmeta needs to match up correctly with the post._

To import the data we first need to open the database of the blank WordPress site within Sequel Pro. You’ll need to click the table that matches your exported CSV. So, to import the metadata we’d have to click on **wp_postmeta** before we import.

With the table selected go to **File > Import** or use the OSX shortcut **CMD + SHIFT + I**, locate the CSV you exported to your computer and select it. Once you’ve selected it you should be asked to match up the rows (which should automatically match), select the import method as insert and finally check that the first line contains the table names (this will depend on your export options).

![1-6E2Zc148shRkbKCnAodVcg.png](/uploads/1-6E2Zc148shRkbKCnAodVcg.png)

_Note: If you do not care about the data already in the system, you can use replace as the import method which will overwrite any conflicts it may find, but as this is a new install you shouldn’t really have any conflicts._

Repeat this process for the other CSVs you exported and all of your data will be imported. 

There are just a couple more steps left to go.

### Updating the URLs