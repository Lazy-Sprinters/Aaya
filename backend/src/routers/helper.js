const utils = require('../lib/util');
const Client = require('../models/client');
const ServiceProvider = require('../models/serviceProvider');
const Request = require('../models/request');
const mongoose = require('mongoose');

exports.listPendingClientVerificationRequests = async () =>{
  let pendingApprovalClients = await Client.find({identityVerified: false});
  filteredArray = [];
  for (let client of pendingApprovalClients){
    let currClient = client;
    currClient.password="";
    filteredArray.push(currClient);
  }
  return filteredArray;
}

exports.listPendingServiceProvidertVerificationRequests = async () => {
  let pendingApprovalServiceProviders = await ServiceProvider.find({identityVerified: false});
  filteredArray = [];
  for (let serviceProvider of pendingApprovalServiceProviders){
    let currServiceProvider = serviceProvider;
    currServiceProvider.password="";
    filteredArray.push(currServiceProvider);
  }
  return filteredArray;
}

// exports.listCancellationRequests = async () => {
//   let cancelledRequests = await Request.find({cancelled: true});
//   for (const request of cancelledRequests) {
//     const associatedServiceProvider = await ServiceProvider.findOne({_id: request.ServiceProviderId})
//   }
// }

// serviceProviders will be marked as eligible if they are available in the given time slot
exports.getAvailableServiceProviders = async (matchingServiceProviders, patientId, startDate, endDate, startTimeDay, endTimeDay) =>{
  let availableServiceProviders = [];
  for (const serviceProvider of matchingServiceProviders){
    const associatedRequests = await Request.find({'serviceProviderId':  mongoose.Types.ObjectId(serviceProvider._id)});
    let serviceProviderFound = false;
    for (const request of associatedRequests){
      if (parseDate(request.endDate) == parseDate(startDate) && (request.endTimeDay + ":00") <  (startTimeDay + ":00"))
      {
        if (request.status != "Confirmed" && request.patientId != patientId){
          serviceProviderFound = true
          break;
        }
      }
      else if (parseDate(request.startDate) == parseDate(endDate) && (request.startTimeDay + ":00") >  (endTimeDay + ":00"))
      {
        if (request.status != "Confirmed" && request.patientId != patientId){
          serviceProviderFound = true
          break;
        }
      }
      else if (parseDate(request.endDate) < parseDate(startDate) || parseDate(request.startDate) > parseDate(endDate))
      {
        if (request.status != "Confirmed" && request.patientId != patientId){
          serviceProviderFound = true
          break;
        }
      }
    }
    if (serviceProviderFound || associatedRequests.length == 0){
      availableServiceProviders.push(serviceProvider);
    }
  }
  return availableServiceProviders
}

const parseDate = (date) =>{
  //18/09/2001 => 2001-09-18
  return new Date(date.split("/").reverse().join("-"));
}

const getAge = (dob) =>{
  let today = new Date();
  let birthDate = parseDate(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

const getNegPosPercentage = (reviews) => {
  let pos = 0, neg = 0;
  for (const review of reviews) {
    if (review.reviewRating < 3){
      neg += 1;
    }
    else{
      pos += 1;
    }
  }
  if (reviews.length == 0){
    return [null, null];
  }
  return [parseFloat(neg/reviews.length), parseFloat(neg/reviews.length)];
}

exports.filterServiceProvider = (serviceProviders) =>{
  let filteredList = []
  for (const serviceProvider of serviceProviders) {
    filteredList.push({
      _id: serviceProvider._id,
      name: serviceProvider.name,
      age: getAge(serviceProvider.dob),
      serviceType: serviceProvider.serviceType,
      yearsOfExperience: serviceProvider.yearsOfExperience,
      displayPictureURL: serviceProvider.displayPictureURL,
      dailyFees: serviceProvider.dailyFees,
      rating: serviceProvider.rating,
      reviews: serviceProvider.reviews,
      negativeFeedBackPercentage: (getNegPosPercentage(serviceProvider.reviews)[0]) === null ? 20 : (getNegPosPercentage(serviceProvider.reviews)[0]),
      positiveFeedBackPercentage: (getNegPosPercentage(serviceProvider.reviews)[1]) === null ? 80 : (getNegPosPercentage(serviceProvider.reviews)[1])
    })
  }
  return filteredList;
}

exports.viewServiceProvider = async (serviceProviderId) => {
  let associatedServiceProvider = await ServiceProvider.findOne({'_id':mongoose.Types.ObjectId(serviceProviderId)})
  associatedServiceProvider.password = "";
  return associatedServiceProvider;
}

exports.viewClient = async (clientId) => {
  let associatedClient = await Client.findOne({'_id': mongoose.Types.ObjectId(clientId)})
  associatedClient.password = "";
  return associatedClient;
}

// module.exports = {parseDate}