import axios from 'axios'

const isAbsoluteURLRegex = /^(?:\w+:)\/\//

axios.interceptors.request.use(async (config) => {
    if (!isAbsoluteURLRegex.test(config.url)) {      
        config.url = "http://codemobiles.com/adhoc" + config.url
    }
    config.timeout = 10000 // 10 Second 
    return config
})

export const httpClient = axios
