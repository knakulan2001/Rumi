-- user
INSERT INTO `rumi-db2`.`user`
(
`username`,
`password`,
`email`,
`description`,
`gender`,
`school`,
`major`,
`smoker`,
`pets`,
`activated`,
`deleted`)
VALUES
(
'rumi1',
'password',
'rumi1@rumi.com',
'I am normal user',
'F',
'SFSU',
30,
1,
1,
1,
0);

INSERT INTO `rumi-db2`.`user`
(
`username`,
`password`,
`email`,
`description`,
`gender`,
`school`,
`major`,
`smoker`,
`pets`,
`activated`,
`deleted`)
VALUES
(
'rumi2',
'password',
'rumi2@rumi.com',
'I am normal user',
'M',
'SFSU',
31,
0,
1,
1,
0);

INSERT INTO `rumi-db2`.`user`
(
`username`,
`password`,
`email`,
`birthday`,
`activated`,
`admin`,
`deleted`)
VALUES
(
'admin',
'password',
'admin@rumi.com',
current_timestamp(),
1,1,0);


-- post
INSERT INTO `rumi-db2`.`post`
(
`caption`,
`description`,
`price`,
`location`,
`photo`,
`thumbnail`,
`parking`,
`pet`,
`smoking`,
`gender`,
`latitude`,
`longitude`,
`creator_id`,
`deleted`)
VALUES
(
'JTHAVN Joshua Tree Remote Desert Bubble Stargazing',
'Unique desert bubble is located in a private 30 acres lot! ~13 miles from Joshua Tree National Park in Joshua Tree, California!
If you love traveling, camping, uniqueness, nature, adventure and experience the magic of the desert, the bubble is a purposefully designed tent with intentional features to help you maximize your travel experiences. Comfortable, luxurious and right in the middle of the desert. Experience the best of both world.',
1000,
1,
'image1.jpeg',
'thumbnail-image1.jpeg',
0,
1,
1,
'N',
1,1,
2,
0);

INSERT INTO `rumi-db2`.`post`
(
`caption`,
`description`,
`price`,
`location`,
`photo`,
`thumbnail`,
`parking`,
`pet`,
`smoking`,
`gender`,
`latitude`,
`longitude`,
`creator_id`,
`deleted`)
VALUES
(
'Glass cottage with Hot tub "Blár"',
'Welcome to Glass cottages Iceland.

We are located on a lava desert in the south of Iceland. 5 minutes from the small town of Hella, close to all the popular attractions that southern Iceland has to offer, but also in a secret and secluded location.',
800,
2,
'image2.jpeg',
'thumbnail-image2.jpeg',
1,
0,
1,
'F',1,1,
1,
0);

INSERT INTO `rumi-db2`.`post`
(
`caption`,
`description`,
`price`,
`location`,
`photo`,
`thumbnail`,
`parking`,
`pet`,
`smoking`,
`gender`,
`latitude`,
`longitude`,
`creator_id`,
`deleted`)
VALUES
(
'Invisible House Joshua Tree - Skyscraper with Pool',
'Quite simply, Invisible House is the most spectacular house in Joshua Tree. As seen in design and lifestyle publications worldwide, this mirrored 22 story horizontal skyscraper virtually disappears into the vast desert landscape. The luxurious 100-foot indoor swimming pool contrasts with the High Desert surroundings. The 90 acre property has its own 4000ft mountain and shares half a mile border with the National Park.',
900,
3,
'image3.jpeg',
'thumbnail-image3.jpeg',
1,
1,
0,
'M',1,1,
2,
0);