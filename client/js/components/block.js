export const createBlockElement = block =>
	`<a class="block" href="${block.url}" target="_blank" style="background-color: ${block.color}">
		<div class="block-icon">
			<img src="${block.icon}"></p>
		</div>
		<div class="block-title">
			<p>${block.title}</p>
		</div>
	</a>`
	
