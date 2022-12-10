const {
  getFirestore,
  doc,
  GeoPoint,
  updateDoc,
} = require("firebase/firestore");

const response = require("../response/response");

const { db } = require("../helper/firebase.helper");
const messageResponse = require("../response/messages");

const firestore = getFirestore(db);
const updateLocation = async (req, res) => {
  try {
    const data = req.body;
    await updateDoc(doc(firestore, "Trackers", data.trackerId), {
      coordinates: new GeoPoint(data.latitude, data.longitude),
    });
    // await firestore
    //   .collection("Trackers")
    //   .doc(data.trackerId)
    //   .update({
    //     coordinates: new firestore.GeoPoint(data.latitude, data.longitude),
    //   });
    const responseObject = response.success(
      messageResponse.updateOne(data.trackerId)
    );
    return res.status(200).json(responseObject);
  } catch (error) {
    const responseObject = response.error(error.message);
    res.status(200).json(responseObject);
  }
};

module.exports = {
  updateLocation,
};
