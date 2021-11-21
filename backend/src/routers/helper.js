const utils = require('../lib/util');
const Client = require('../models/client');
const ServiceProvider = require('../models/serviceProvider');
const Request = require('../models/request');

exports.listPendingClientVerificationRequests = async () =>{
  let pendingApprovalClients = await Client.find({identityVerified: false});
  pendingApprovalClients.forEach(client => {
    delete client.password;
    delete client.emailVerified;
    delete client.phoneNumberVerified;
    delete client.blocked;
    delete client.reviews;
    delete client.rating;
    delete client.identityVerified;
  });
  return pendingApprovalClients;
}

exports.listPendingServiceProvidertVerificationRequests = async () => {
  let pendingApprovalServiceProviders = await ServiceProvider.find({identityVerified: false});
  pendingApprovalServiceProviders.forEach(serviceProvider => {
    delete serviceProvider.password;
    delete serviceProvider.emailVerified;
    delete serviceProvider.phoneNumberVerified;
    delete serviceProvider.blocked;
    delete serviceProvider.reviews;
    delete serviceProvider.rating;
    delete serviceProvider.identityVerified;
  });
  return pendingApprovalServiceProviders;
}

// exports.listCancellationRequests = async () => {
//   let cancelledRequests = await Request.find({cancelled: true});
//   for (const request of cancelledRequests) {
//     const associatedServiceProvider = await ServiceProvider.findOne({_id: request.ServiceProviderId})
//   }
// }

// serviceProviders will be marked as eligible if they are available in the given time slot
exports.getAvailableServiceProviders = async (matchingServiceProviders, startDate, endDate, startTimeDay, endTimeDay) =>{
  let availableServiceProviders = [];
  for (const serviceProvider of matchingServiceProviders){
    const associatedRequests = await Request.find({'_id': serviceProvider._id});
    let serviceProviderFound = false;
    for (const request in associatedRequests){
      if (parseDate(request.endDate) == parseDate(startDate) && (request.endTimeDay + ":00") <  (startTimeDay + ":00"))
      {
        if (request.status != "Confirmed"){
          serviceProviderFound = true
          break;
        }
      }
      else if (parseDate(request.startDate) == parseDate(endDate) && (request.startTimeDay + ":00") >  (endTimeDay + ":00"))
      {
        if (request.status != "Confirmed"){
          serviceProviderFound = true
          break;
        }
      }
      else if (parseDate(request.endDate) < parseDate(startDate) || parseDate(request.startDate) > parseDate(endDate))
      {
        if (request.status != "Confirmed"){
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
  return [parseFloat(neg/reviews.length), parseFloat(neg/reviews.length)];
}

exports.filterServiceProvider = (serviceProviders) =>{
  let filteredList = []
  for (const serviceProvider of serviceProviders) {
    filteredList.push({
      _id: serviceProvider._id,
      name: serviceProvider.name,
      age: getAge(serviceProvider.age),
      serviceType: serviceProvider.serviceType,
      yearsOfExperience: serviceProvider.yearsOfExperience,
      displayPictureURL: serviceProvider.displayPictureURL,
      hourlyFees: serviceProvider.hourlyFees,
      rating: serviceProvider.rating,
      reviews: serviceProvider.reviews,
      negativeFeedBackPercentage: getNegPosPercentage(serviceProvider.reviews)[0],
      positiveFeedBackPercentage: getNegPosPercentage(serviceProvider.reviews)[1]
    })
  }
  return filteredList;
}
