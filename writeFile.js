import fs from 'fs'

// TODO: create directory and file if not exists (mkdir)
export default function WriteToFile(content, name) {
  const directory = './recipes'
  const fileName = directory + '/' + name + '.json'
  const write = () => {
    fs.writeFile(fileName, content, { flag: 'a+' }, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
      console.log('file written')
    })
  }

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, (err) => {
      console.log(err)
    })
  }
  write()
}
