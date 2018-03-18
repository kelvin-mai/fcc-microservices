document.getElementById('form').addEventListener('submit', e => {
	e.preventDefault();
	const href = window.location.href;
	const url = e.target[0].value;

	fetch(`/api/${url}`)
		.then(res => res.json())
		.then(data => {
			if (data.short) window.location.href = `${href}${data.url}`;
			else {
				fetch(`/api/${url}`, { method: 'POST' })
					.then(res => res.json())
					.then(data => (window.location.href = `${href}api/${data.short}`))
					.catch(err => (window.location.href = `${href}api/`));
			}
		})
		.catch(err => (window.location.href = `${href}api/`));
});
