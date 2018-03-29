
export const createModule = (data, catkey) =>  `
  <div class="aloha"> 
    <p> ${data.catkey.titre}</p>
    <p> ${data.catkey.url}</p>
    <p> ${data.catkey.color}</p>
    <p> ${data.catkey.position}</p>
  </div> 
  `

  export const pouet = modules => console.log(modules.lenght)