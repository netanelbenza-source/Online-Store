import fs from 'fs/promises'



export async function readDataFromJson(path) {
    const lodingData  = await fs.readFile(path,'utf-8')
    const createObj = JSON.parse(lodingData)
    return createObj 
    
}



export async function writeDataToJson(path,data) {
    const WriteData  = await fs.writeFile(path,JSON.stringify(data,null,2),'utf-8')
}


