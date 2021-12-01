import fs from 'fs'

export default function WriteToFile(content, name) {
  const filePath = './' + name + '.json'
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
    console.log('file written')
  })
}
