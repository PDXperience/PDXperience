// front-end routing

page('/id/:id', poiController.getId);
page('/me/add/:id', userController.addItinerary);
page('/me/delete/:id', userController.deleteItinerary);

// //page('/admin', adminController.reveal);

page();
