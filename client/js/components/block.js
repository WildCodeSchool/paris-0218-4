const createAdminEditionHeader = block => `
  <div class="edit-delete">
    <p class="edit-button"><a class="link-edit-module" style="color:${block.titleColor}">Edit</a></p>
    <span class="separator" style="color:${block.titleColor}">|</span>
    <p class="delete-button"><a class="link-delete-module" style="color:${block.titleColor}">Delete</a></p>
  </div>
  <div class="edit-delete" style="display:none">
    <p class="confirm-deletion"><a style="color:${block.titleColor}">Click again to confirm deletion</a></p>
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
