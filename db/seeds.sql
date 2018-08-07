USE  duber_db;

INSERT INTO Owners (name, gender, email, contact, address, age) VALUES('Richard', 'Male', 'richard@richard.com', '801-888-8888', '1234 Main Street, Sandy, UT 84070',
27);

INSERT INTO Pets (name, sex, breed, age, social_w_people, social_w_dogs, favorite_activities, leashed, activity_level, size, sitter_gender, image_link)
VALUES('Scooter', 'Male', 'Shitzu', 4, true, true,
'walks, throwing a ball, hanging out', true, 'active', 'small',
'either', 'https://img.buzzfeed.com/buzzfeed-static/static/2015-12/8/21/campaign_images/webdr09/21-cute-dog-pictures-to-help-you-put-off-whatever-2-17537-1449629310-18_dblbig.jpg');

INSERT INTO Sitters (name, gender, email, contact, address, age, preferred_breed, preferred_size, preferred_activity, image_link)VALUES('Nick', 'Male', 'nick@nick.com',
'801-855-5555', '1222 Cherry Street, Salt Lake City, UT 84444', 
28, 'any', 'any', 'any', 'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg');