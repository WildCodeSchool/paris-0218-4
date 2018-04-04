export const createBlockElement = block =>
	`<a class="block" href="${block.url}" target="_blank" style="background-color: ${block.color}">
		<div class="block-icon">
			<img class="icon" src="${block.icon}"></p>
		</div>
		<div class="block-title">
			<p style="color: ${block.titleColor}">${block.title}</p>
		</div>
	</a>`
	
