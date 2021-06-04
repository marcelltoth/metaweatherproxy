const fetch= require('node-fetch')
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
   
    await fetch(`https://www.metaweather.com/api/location/${req.params.id}`)
        .then(res => res.json())
        .then(responseBody => {
            
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: responseBody,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET'
                }
            };
            
        }).catch(error => {
            context.res = {
                status: 500,
                body: `Oops, we fcked it!\n${error.toString()}`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET'
                }
            };
        })
}