const busFields = {
  busNumber: 1,
  busIdNumber: 1,
  busRoute: 1,
  busDriverName: 1,
  busDriverId: 1,
  trackerId: 1,
  isAssigned: 1,
};

const busFieldsNeedIds = {
  busNumber: 1,
  busIdNumber: 1,
};

const driverFields = {
  name: 1,
  phoneNumber: 1,
  idNumber: 1,
  isStarted: 1,
};

module.exports = {
  busFields,
  driverFields,
  busFieldsNeedIds,
};
