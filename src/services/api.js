
const axios = require('axios').default;
const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs';
const companyId = 171

const getContactList = (params, page, countryId) =>{

    let _param = {'companyId': companyId};
    _param['page'] = page;
    if(countryId !== null){
        _param['countryId'] = countryId;
        
    }

    _param = {..._param, ...params};

    return axios({
        'method': 'get',
        'url': 'https://api.dev.pastorsline.com/api/contacts.json',
        'headers': { 'Authorization': `Bearer ${authToken}`},
        'params': _param
    })

}

export { getContactList };