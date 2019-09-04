import fs from 'fs';
import store from './store'
import axios from 'axios';
const instance = axios.create({
  timeout: 1000,
})
const electron = require('electron');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');


// Fetch the base url prior to every request
instance.interceptors.request.use(request => {
  const baseUrl = store.getters.getBaseUrl;
  console.log(baseUrl)
  request.url = baseUrl + request.url;
  return request; 
})

const FlexSearch = require("flexsearch");
const index = new FlexSearch(
    {
        encode: "advanced",
        tokenize: "reverse",
        suggest: true,
        doc: {
            id: "id",
            field: [
                "name",
                "finding",
                "risk",
                "recommendation"
            ]
        }
    });

const INDEX_FILE_NAME = `${userDataPath}/repost-index`;

let exportIndexToFile = () => {
    fs.writeFileSync(INDEX_FILE_NAME, index.export())
}

let importIndexFromFile = () => {
    const index_string = fs.readFileSync(INDEX_FILE_NAME)
    index.import(index_string)
}

let indexFindings = findings => {

    findings.forEach(finding => {
        const languages = Object.keys(finding.name);
        languages.forEach(language => {
            console.log(finding.name[language])
            const doc = { 'id': `${finding.id}-${language}`, 'name': finding.name[language], 'finding': finding.finding[language], 'risk': finding.risk[language], 'recommendation': finding.recommendation[language] }
            index.add(doc)
        })
    })

    console.log(index.info());
    exportIndexToFile();
}

export let query = q => {
    importIndexFromFile();
    const res = index.search(q, {field: ['name', 'finding', 'risk', 'recommendation']});
    console.log(res)
    return res;
}

export let findById = id => {
    importIndexFromFile();
    return index.find(id)
}

export let resync = () => {
    console.log("Test")
    instance.get('/api/v1/finding')
        .then(response => {
            indexFindings(response.data.data)
        }, err => {
            console.log(err)
        })
}