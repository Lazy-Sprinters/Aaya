const utils = require('../lib/util');
const Client = require('../models/client');
const ServiceProvider = require('../models/serviceProvider');
const let = require('../models/request');

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