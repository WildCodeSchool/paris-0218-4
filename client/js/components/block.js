const createAdminEditionHeader = block => `
  <div class="edit-delete">
    <p class="edit-button"><a href="#" class="link-edit-module" style="color:${block.titleColor}; text-decoration:none">Edit</a></p>
    <span class="separator" style="color:${block.titleColor}; text-decoration:none">|</span>
    <p class="delete-button"><a class="link-delete-module" style="color:${block.titleColor}; text-decoration:none">Delete</a></p>
  </div>
`

export const createBlockElement = block => `
	<div id="module-${block.id}" class="block" style="background-color:${block.color}">
	  ${document.isAdmin ? createAdminEditionHeader(block) : ''}
    <a class="link-url" href="${block.url}" target="_blank">
      <div class="block-icon">
        <img class="icon" src="${block.icon}"></p>
      </div>
    </a>
    <a href="${block.url}" target="_blank" style="text-decoration:none">
      <div class="block-title">
        <p class="title-module" style="color: ${block.titleColor}">${block.title}</p>
      </div>
    </a>
	</div>
`

export const createPlusBlockElement = () => `
	<div id="block-plus" class="block">
	  <p class="plus">+</p>
	  <p class="add-new-module">Add a new module</p>
	</div>
`
