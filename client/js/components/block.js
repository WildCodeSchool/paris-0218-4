export const createBlockElement = block =>
	`<a class="block" href="${block.url}" target="_blank" style="background-color: ${block.color}">
		<div class="block-content">
			<p>${block.title}</p>
			<p>LOGO</p>
		</div>
	</a>`
	
