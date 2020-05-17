import axios from 'axios'
const baseUrl = 'http://localhost:8081'

export  function getInfo(url,params={}) {
  return new Promise((resolve,reject)=>{
    axios.get(url,{params:params})
      .then((response)=>{
        resolve(response.data)
      })
      .catch((error) =>{
        reject(error)
      })
  })
}
export function  postInfo(url,data = {}){

  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


export function updateInfo(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


export function deleteInfo(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.delete(url,data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

