const handler = require('./handler');
const routers = [
{
    method:'GET',
    path:'/api/v1/checkin_checkout',
    config : handler.getMany
},
{
    method:'POST',
    path:'/api/v1/checkin_checkout',
    config : handler.createOne
},
// {
//     method:'GET',
//     path:'/api/v1/checkin_checkout',
//     config : handler.getManyOne
// },
{
    method:'DELETE',
    path:'/api/v1/checkin_checkout/{id}',
    config : handler.deleteOne
}
];

module.exports = routers