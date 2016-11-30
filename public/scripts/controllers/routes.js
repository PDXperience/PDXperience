// front-end routing

page('/id*', poiController.getId);
page('/add*', userController.addItinerary);
page('/delete*', userController.deleteItinerary);
page('/review*', userController.addReview);

page();
