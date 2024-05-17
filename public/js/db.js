// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

// Real-time listener for Firestore collection
db.collection('cakes').onSnapshot(snapshot => {
    //console.log('starting process of fetching data');
    snapshot.docChanges().forEach(change => {
      const id = change.doc.id;
      if (change.type === 'added') {
        // Call renderRecipe function to render the newly added recipe
        renderRecipe(change.doc.data(), change.doc.id);
      }
      if (change.type === 'removed') {
        // Call removeRecipe function to remove the deleted recipe
        removeRecipe(id);
      }
    });
  });
  